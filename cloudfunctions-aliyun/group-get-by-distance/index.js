/**
 * Retrieve random n(10) groups among top m(100) groups within distance
 * 
 * @param location  {"longitude":113.297039,"latitude":23.091151,"radius":"100", "units":"km", "number":100}
 */
'use strict';
const db = uniCloud.database()
const {
	RedisService, AbstractResponse
} = require('utils')
const redisService = new RedisService()
const randomGroupNumber = 10

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	const key = 'mf:group:geo'
	console.log("Retrieve group from redis")
	const result = await redisService.geoRadius(key, event.longitude, event.latitude, event.radius, event.units, event.number);

	console.log("retrieved group : %s", JSON.stringify(result))
	const randomGroups = getRandomGroup(result)
	let resultGroups = []
	for (const groupGeo of randomGroups) {
		console.log('group geo key: %s', groupGeo[0])
		const groupId = groupGeo[0].split(':')[groupGeo.length - 1]
		let group = await uniCloud.callFunction({
			name: 'group-get-by-docId',
			data: {
				id: groupId
			}
		}).then(res => {
			console.log('retrieved group %s: %s', groupId, JSON.stringify(res))
			resultGroups.push(res.result.result.data[0])
		}).catch(err => {
			console.log('Error retrieving group %s', groupId)
		})
	}

	console.log("Nearby groups' size: %s", resultGroups.length)

	return new AbstractResponse(200, resultGroups, null)
};


function getRandomGroup( groups ) {
	let result = new Set();
	if ( groups.length <= randomGroupNumber ) {
		return groups
	} else {
		while (result.size < randomGroupNumber) {
			result.add(groups[Math.floor(Math.random()*groups.length)])
		}
		return Array.from(result)
	}
}