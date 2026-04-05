'use strict';
const db = uniCloud.database()
const { AbstractResponse } = require('utils')

exports.main = async (event, context) => {
	console.log("Retrieve group from database for group %s", event.id)
	const collection = db.collection('group')
	const res = await collection.doc(event.id).get();
	console.log("retrieved group : %s", JSON.stringify(res))
	
	if ( event.userId != null ){
		await updateGroupView( event.id, event.userId )
	}
	return new AbstractResponse(200, res.data[0], null)
};

async function updateGroupView(groupId, userId) {
	console.log('groupId %s and userId %s', groupId, userId)
	const collection = db.collection('group')
	let updateViewResult = await collection.doc(groupId).update({
		views: db.command.inc(1)
	})
	console.log('Update Group %s view result %s', groupId, JSON.stringify(updateViewResult))
}
