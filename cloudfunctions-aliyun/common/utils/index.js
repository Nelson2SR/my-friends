const base64Arraybuffer = require('base64-arraybuffer')
// const redis = require("redis")
const { GlobalSearch } = require("./algolia/global-search.js")
const { RedisService } = require("./redis/redis-service.js")

function encodeBuffer( buffer ) {
		return base64Arraybuffer.encode(buffer);
}

function decodeString( str ) {
	return base64Arraybuffer.decode( str );
}

function getVersion() {
	return '1.0.0'
}

// function redisClient() {
// 	const client = redis.createClient({
// 		'host':'us1-infinite-kodiak-30516.lambda.store',
// 		'port':30516,
// 		'password':'ee2693dace424efe8721492eb08e4024' 
// 	});

// 	return client
// }

module.exports = {
	encodeBuffer,
	decodeString,
	getVersion,
	// redisClient,
	GlobalSearch,
	RedisService
}