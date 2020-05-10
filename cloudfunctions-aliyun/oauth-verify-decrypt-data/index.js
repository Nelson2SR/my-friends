'use strict';

const WXBizDataCrypt = require('./WXBizDataCrypt')

exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  var appId = event.appId
  var encryptedData = event.rawData;
  var iv = event.iv
  var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
  
  var pc = new WXBizDataCrypt(appId, sessionKey)
  
  var data = pc.decryptData(encryptedData , iv)
  
  console.log('解密后 data: ', data)
  // 解密后的数据为
  //
  // data = {
  //   "nickName": "Band",
  //   "gender": 1,
  //   "language": "zh_CN",
  //   "city": "Guangzhou",
  //   "province": "Guangdong",
  //   "country": "CN",
  //   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
  //   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
  //   "watermark": {
  //     "timestamp": 1477314187,
  //     "appid": "wx4f4bc4dec97d474b"
  //   }
  // }
  
  
  //返回数据给客户端
  return data
};
