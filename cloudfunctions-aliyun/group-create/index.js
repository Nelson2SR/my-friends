'use strict';
const db = uniCloud.database()
//TODO: figure out why geoadd not available in common utils
const {
	RedisService
} = require('./redis/redis-service.js')
const {GlobalSearch} = require('utils')
const redisService = new RedisService()
const globalSearch = new GlobalSearch()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	//connect collection
	const collection = db.collection('group')
	const result = await collection.add(event)
	console.log('group is created: %s', JSON.stringify(result))

	//save group in redis
	const locationKey = 'mf:group:geo'
	const name = 'group:geo:'+ result.id
	const geoAddResult = await redisService.geoAdd(locationKey, event.location.longitude, event.location.latitude, name)
	if ( geoAddResult != 1) { 
		console.warn('Add group geometry failed for group id %s', result.id)
	}
	
	//save group in algolia
	try{
		event['objectID'] = result.id
		let groups = []
		groups.push(event)
		let objectIds = await globalSearch.saveObjects(groups)
		console.log('Successfully saving objects id: %s', JSON.stringify(objectIds))
	}catch(e){
		console.error('Error saving objects in Algolia: %s', JSON.stringify(e))
	}
	
	console.log('Add group geometry successfully - %s', geoAddResult)
	
	return result
	// redisService.geoAdd(locationKey, event.location.longitude, event.location.latitude, name)
	// 	.then(res => {
	// 		console.log('Add group geometry successfully - %s', res)
			
	// 		return result
	// 	}).catch(err => {
	// 		console.log(err)
			
	// 		return new AbstractResponse(400, null, 'Error adding group geo')
	// 	})
	// //返回数据给客户端
	// return result
};
