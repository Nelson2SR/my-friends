'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	let post = await db.collection('post').where({
		groupId: event.groupId
	}).orderBy('createdAt', 'desc').get()
	
	console.log('Retrieved post: %s', JSON.stringify(post))
	return post
};
