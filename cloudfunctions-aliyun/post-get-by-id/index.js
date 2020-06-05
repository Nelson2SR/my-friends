'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	let post = await db.collection('post').where({
		_id: event.id
	}).get()
	
	console.log('Retrieved post: %s', JSON.stringify(post))
	return post
};
