'use strict';
const { encodeBuffer, getVersion } = require('utils')
const { UserSessionService } = require('./service/user-session-service')
const db = uniCloud.database()
const userSessionService = new UserSessionService();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	const appId = event.appId;
	const appSecret = event.appSecret;
	const code = event.code;
	const grant_type = 'authorization_code';

	const res = await uniCloud.httpclient.request(
	'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=' + grant_type)
	
	if ( res.err ) {
		console.error(res.err);
		
		return res;
	}
	else {
		let dataBuffer = (JSON.parse(JSON.stringify(res))).data.data
		dataBuffer = Buffer.from(dataBuffer)
		const sessionKey = JSON.parse(dataBuffer.toString('utf-8')).session_key
		const openId = JSON.parse(dataBuffer.toString('utf-8')).openid;
		
		// store session_key
		const result = await userSessionService.storeUserSession(sessionKey, openId)
		
		console.log("data buffer:" + dataBuffer.toString('utf-8'))
		console.log("response" + JSON.stringify(result))
		
		const responseData = {
			sessionId: result.id,
			openId: openId
		}
		return responseData;
	}
	
};
