/**
 * Retrieve group by group id
 * 
 * @param {String}  = [groupId] 
 */
'use strict';
const db = uniCloud.database()
const { RedisService, AbstractResponse } = require('utils')
const redisService = new RedisService()

exports.main = async (event, context) => {
		const groupKey = "mf:group:"+event.id
		let group = await redisService.getObject(groupKey)
		console.log("Cached group: %s", JSON.stringify(group))
		if ( group == null )
		{
			console.log("Retrieve group from database")
			const collection = db.collection('group')
			const res = await collection.doc(event.id).get();
			console.log("retrieved group : %s", JSON.stringify(res))
			await redisService.postObject(groupKey, JSON.stringify(res.data))
			return new AbstractResponse(200, res.data[0], null)
		}
		else {
			console.log("Retrieve group from redis")
			return new AbstractResponse(200, JSON.parse(group), null)
		}
};
