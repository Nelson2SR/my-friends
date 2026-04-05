'use strict';
const db = uniCloud.database()
const { GlobalSearch } = require('utils')
const globalSearch = new GlobalSearch()

exports.main = async (event, context) => {
	console.log('event : ' + event)

	if (event.location && event.location.longitude && event.location.latitude) {
	    event.location.point = new db.Geo.Point(event.location.longitude, event.location.latitude)
	}

	const collection = db.collection('group')
	const result = await collection.add(event)
	console.log('group is created: %s', JSON.stringify(result))

	try{
		event['objectID'] = result.id
		const algoliaPayload = { ...event }
		delete algoliaPayload.location.point

		let groups = [algoliaPayload]
		let objectIds = await globalSearch.saveObjects(groups)
		console.log('Successfully saving objects id: %s', JSON.stringify(objectIds))
	}catch(e){
		console.error('Error saving objects in Algolia: %s', JSON.stringify(e))
	}
	
	return result
};
