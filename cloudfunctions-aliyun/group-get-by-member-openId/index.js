'use strict';
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
	
	console.log('Retrieved group: %s', JSON.stringify(group))
	return group
};