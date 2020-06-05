'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  if ( event.topicType === 'post') {
	  let post = await uniCloud.callFunction({
	  	name:'post-get-by-id',
		data:{
			id: event.topicId
		}
	  })
	  console.log('Retrieved post %s', JSON.stringify(post))
	  
	  if (!post.result.data || post.result.data.length === 0) {
	  	return {
	  		status: -1,
	  		msg: 'Post not found for id ' + event.topicId
	  	}
	  }
	  const collection = db.collection('post')
	  const postId = post.result.data[0]._id
	  const updatedPost = post.result.data[0]
	  updatedPost.likeCount.push(event.fromUserId)
	  delete updatedPost['_id']
	  console.log('update post id %s with data %s', post.result.data[0]._id, JSON.stringify(updatedPost))
	  const res = await collection.doc(postId).update(updatedPost)
	  if (res.updated === 1) {
	  	let result = Object.assign({}, {
	  		_id: post.result.data[0]._id
	  	}, updatedPost)
	  	return {
	  		status: 0,
	  		data: `${JSON.stringify(result)}`
	  	}
	  } else {
	  	return {
	  		status: -1,
	  		msg: `Collection Post no data`
	  	}
	  }
  }else if ( event.topicType === 'comment') {
	  let comment = await uniCloud.callFunction({
	  	name:'comment-get-by-id',
		data:{
			id: event.topicId
		}
	  })
	  
	  if (!comment.result.data || comment.result.data.length === 0) {
	  	return {
	  		status: -1,
	  		msg: 'Comment not found for id ' + event.topicId
	  	}
	  }
	  const collection = db.collection('comment')
	  const commentId = comment.result.data[0]._id
	  const updatedComment = comment.result.data[0]
	  updatedComment.likeCount.push(event.fromUserId)
	  delete updatedComment['_id']
	  console.log('update comment id %s with data %s', comment.result.data[0]._id, JSON.stringify(updatedComment))
	  const res = await collection.doc(commentId).update(updatedComment)
	  if (res.updated === 1) {
	    	let result = Object.assign({}, {
	    		_id: comment.result.data[0]._id
	    	}, updatedComment)
	    	return {
	    		status: 0,
	    		data: `${JSON.stringify(result)}`
	    	}
	    } else {
	    	return {
	    		status: -1,
	    		msg: `Collection Comment no data`
	    	}
	    }
  }
};
