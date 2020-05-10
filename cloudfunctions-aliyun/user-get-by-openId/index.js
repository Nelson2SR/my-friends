'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const collection = db.collection('user')
	const res = await collection.where({
		open_id: event.open_id
	}).get()
	
	return res
};
