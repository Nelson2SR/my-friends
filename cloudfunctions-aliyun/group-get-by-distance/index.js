'use strict';
const db = uniCloud.database()
const { AbstractResponse } = require('utils')

const randomGroupNumber = 10

exports.main = async (event, context) => {
	console.log('event : ', event)

	try {
		const collection = db.collection('group')
		const res = await collection.where({
		    "location.point": db.command.geoNear({
		        geometry: new db.Geo.Point(event.longitude, event.latitude),
		        maxDistance: event.radius * 1000
		    })
		}).limit(event.number || 100).get()

		console.log('Geo Result: %s', JSON.stringify(res.data))

		const randomGroups = getRandomGroup(res.data)
		console.log("Nearby groups' size: %s", randomGroups.length)

		return new AbstractResponse(200, randomGroups, null)

	} catch (error) {
		console.error('Geo Result error: %s', JSON.stringify(error))
		return new AbstractResponse(400, null, error)
	}
};

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
