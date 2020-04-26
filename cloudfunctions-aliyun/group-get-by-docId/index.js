'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const collection = db.collection('group')
	const res = await collection.doc(event.id).get();
	return res
};
