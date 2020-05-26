'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const collection = db.collection('user')
	const res = await collection.where({
		openId: event.openId
	}).get()
	
	return res
};
