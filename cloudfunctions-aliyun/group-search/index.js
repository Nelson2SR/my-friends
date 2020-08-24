'use strict';
const {GlobalSearch, AbstractResponse} = require('utils')
const globalSearch = new GlobalSearch()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	try{
		const searchResult = await globalSearch.search(event.keyword)
		console.info('Search result: %s', JSON.stringify(searchResult))
		return new AbstractResponse(200, searchResult["hits"], null)
	}catch(e){
		console.error('Error searching keyword %s - %s', event.keyword, JSON.stringify(e))
		return new AbstractResponse(400, null, 'Error occurs while searching')
	}
};
