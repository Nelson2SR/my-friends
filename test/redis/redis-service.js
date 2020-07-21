const {
	promisify
} = require("util");
const redis = require("redis")
// const client = redis.createClient({
// 	'host': 'us1-infinite-kodiak-30516.lambda.store',
// 	'port': 30516,
// 	'password': 'ee2693dace424efe8721492eb08e4024'
// });
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const flushAsync = promisify(client.flushdb).bind(client);
const geoAddAsync = promisify(client.geoadd).bind(client);
const geoDistAsync = promisify(client.geodist).bind(client);
const geoHashAsync = promisify(client.geohash).bind(client);
const geoPosAsync = promisify(client.geopos).bind(client);
const geoRadiusAsync = promisify(client.georadius).bind(client);
const geoRadiusByMemberAsync = promisify(client.georadiusbymember).bind(client);

class RedisService {

	constructor(arg) {

	}

	async postUserSession(token, user) {

	}

	async postObject(key, object) {
		let setObject = await setAsync(key, object)
		console.log("Object are cached for key:%s - %s", key, setObject)
		
		return setObject
	}

	async getObject(key) {
		let object = await getAsync(key)
		console.log("Retrieved cached object for key: %s - %s", key, object)
		
		return object
	}

	async deleteObject(key) {
		let delObject = await delAsync(key)
		console.log("Object are deleted for key: %s - %s", key, delObject)

		return delObject
	}

	async flushDb() {
		let result = await flushAsync()
		console.log('flushDb result %s', result)
	}

	async geoAdd(key, longitude, latitude, name) {
		const result = await geoAddAsync(key, longitude, latitude, name)
		return result
	}

	async geoDist(key1, key2) {
		return await geoDistAsync(key1, key2)
	}

	async geoHash(key1, key2) {
		return await geoHashAsync(key1, key2)
	}

	async geoPos(key) {
		return await geoPosAsync(key)
	}

	async geoRadius(key, longitude, latitude, radius, units) {
		return await geoRadiusAsync(key, longitude, latitude, radius, units, 'WITHCOORD', 'WITHDIST', 'ASC')
	}
}

module.exports = {
	RedisService
}