'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	let commentResult = await db.collection('comment').where({
		topicId: event.topicId,
		topicType: event.topicType
	}).get()
	
	console.log('Retrieved comments: %s', JSON.stringify(commentResult))
	
	const comments = commentResult.data
	
	//read in sequence
	// for (const comment of comments) {
	// 	console.debug('getting replies for comment %s', comment._id)
	// 	let replies = await db.collection('comment').where({
	// 		topicId: comment._id,
	// 		topicType: 'comment'
	// 	}).get()
		
	// 	console.log('Retrieved replies for comment %s: %s', comment._id, replies.data)
	// 	comment.replies = replies.data
	// }
	
	// read in parallel
	await Promise.all(comments.map(async (comment) => {
		console.debug('getting replies for comment %s', comment._id)
		let replies = await db.collection('comment').where({
			topicId: comment._id,
			topicType: 'comment'
		}).get()
		
		console.log('Retrieved replies for comment %s: %s', comment._id, replies.data)
		comment.replies = replies.data
	}))
	
	const response = {
		'code': 200,
		'data': comments
	}
	
	return response
};
