'use strict';
const db = uniCloud.database()
const { RedisService } = require('utils')
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
			return res.data
		}
		else {
			console.log("Retrieve group from redis")
			return JSON.parse(group)
		}
};
