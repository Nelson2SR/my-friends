'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	let commentResult = await db.collection('comment').where({
		_id: event.id,
	}).get()
	
	console.log('Retrieved comment: %s', JSON.stringify(commentResult))
	
	return commentResult
};
