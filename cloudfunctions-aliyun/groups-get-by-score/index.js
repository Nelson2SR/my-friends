'use strict';
const db = uniCloud.database()
const { AbstractResponse } = require('utils')

exports.main = async (event, context) => {
	console.log('event : ', event)
	
	const collection = db.collection('group')
	const num = event.maxNum - event.minNum;
	const res = await collection.orderBy('score', 'desc').skip(event.minNum).limit(num).get()
	
	console.log("Result groups: %s", JSON.stringify(res.data))
	
	return new AbstractResponse(200, res.data, null)
};
