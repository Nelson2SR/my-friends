/**
 * Retrieve random n(10) groups among top m(100) groups within distance
 * 
 * @param location  {"longitude":113.297039,"latitude":23.091151,"radius":"100", "units":"km", "number":100}
 */
'use strict';
const db = uniCloud.database()
const {
	AbstractResponse
} = require('utils')
const {
	RedisService
} = require("./redis/redis-service.js")
const redisService = new RedisService()
const randomGroupNumber = 10

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	const key = 'mf:group:geo'
	console.log("Retrieve group from redis")
	try {
		let res = await redisService.geoRadius(key, event.longitude, event.latitude, event.radius, event.units, event.number)

		console.log('Geo Result: %s', JSON.stringify(res))

		const randomGroups = getRandomGroup(res)
		let resultGroups = []
		let promises = []
		console.log('start collecting promise at %s', new Date())
		for (const groupGeo of randomGroups) {
			console.log('group geo key: %s', groupGeo[0])
			const groupId = groupGeo[0].split(':')[groupGeo.length - 1]

			promises.push(retrieveGroup(groupId))
		}
		console.log('end collecting promise at %s', new Date())

		let results = await Promise.all(promises)

		console.log('Retrieved groups at %s: %s', new Date(), JSON.stringify(results))

		results.forEach(response => {
			resultGroups.push(response.result.data)
		})

		console.log("Nearby groups' size: %s", resultGroups.length)

		return new AbstractResponse(200, resultGroups, null)

	} catch (e) {
		console.error('Geo Result error: %s', JSON.stringify(error))

		return new AbstractResponse(400, null, error)
	}
};


async function retrieveGroup(groupId) {
	return await uniCloud.callFunction({
		name: 'group-get-by-docId',
		data: {
			id: groupId
		}
	});
}

function getRandomGroup(groups) {
	let result = new Set();
	if (groups.length <= randomGroupNumber) {
		return groups
	} else {
		while (result.size < randomGroupNumber) {
			result.add(groups[Math.floor(Math.random() * groups.length)])
		}
		return Array.from(result)
	}
}
