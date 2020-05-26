'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
  const collection = db.collection('group')
  let docList = await uniCloud.callFunction({
  	name:'group-get-by-docId',
	data: {
		'id': event.group._id
	}
  })
  // console.log('Retrieved group %s', JSON.stringify(docList))
  if (!docList.result.data || docList.result.data.length === 0) {
  	return {
  		status: -1,
  		msg: 'Group not found for id ' + event.group._id
  	}
  }
  
  delete event.group['_id']
  console.log('Update Group Data: %s', JSON.stringify(event.group))
  const res = await collection.doc(docList.result.data[0]._id).update(event.group);
  if (res.updated === 1) {
  	let result = Object.assign({}, {
  		_id: docList.result.data[0]._id
  	}, event)
  	return {
  		status: 0,
  		msg: `${JSON.stringify(result)}`
  	}
  } else {
  	return {
  		status: -1,
  		msg: `Collection Group no data`
  	}
  }
};
