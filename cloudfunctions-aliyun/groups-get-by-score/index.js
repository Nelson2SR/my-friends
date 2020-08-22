/**
 * Get groups by scores
 */
'use strict';

const { RedisService, AbstractResponse } = require('utils')
const redisService = new RedisService()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let groupKeys = await redisService.getGroupsByScore(event.maxNum, event.minNum)
	console.log("Get groups by scores groupIds: %s", groupKeys)
	
	let result = []
	for(const groupKey of groupKeys) {
		let group = await redisService.getObject(groupKey)
		
		if (group != null) {
			result.push(JSON.parse(group)[0])
		}
	}
	
	console.log("Result groups: %s", JSON.stringify(result))
	
	//返回数据给客户端
	return new AbstractResponse(200, result, null)
};
