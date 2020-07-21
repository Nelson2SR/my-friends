/**
 * function for retriving groups joined from other users
 * group info should come from database
 * @param {openId}
 */
'use strict';
const { RedisService } = require('utils')
const redisService = new RedisService()

const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
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
	return group
	
};
