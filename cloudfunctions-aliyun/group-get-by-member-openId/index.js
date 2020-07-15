'use strict';
const { RedisService } = require('utils')
const redisService = new RedisService()

const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const groupKey = "mf:group:other:"+event.openId
	let groups = await redisService.getObject(groupKey)
	console.log("Cached groups: %s", JSON.stringify(groups))
	
	if ( groups == null ) {
		const dbCmd = db.command
		let group = await db.collection('group').where({
			owner: {
				openId: dbCmd.neq(event.openId)
			},
			members: {
				openId: event.openId
			}
		}).get()
		
		console.log('Retrieved group: %s - %s', JSON.stringify(group))
		await redisService.postObject(groupKey, JSON.stringify(group))
		return group
	} else {
		console.log("Retrieve groups from redis %s", groups)
		return JSON.parse(groups)
	}
	
};
