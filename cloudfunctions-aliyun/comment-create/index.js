'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  const data = JSON.parse(JSON.stringify(event));
  data.createdAt = new Date().toISOString()
  
  console.log('data : ' + JSON.stringify(data))
  
  //connect collection
  const collection = db.collection('comment')
  const res = await collection.add(data)
  
  //返回数据给客户端
  return res
};
