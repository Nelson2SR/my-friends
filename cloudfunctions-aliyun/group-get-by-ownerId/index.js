'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	const collection = db.collection('group')
	const res = await collection.where({
		owner: event.owner
	}).get()
	return res
};
