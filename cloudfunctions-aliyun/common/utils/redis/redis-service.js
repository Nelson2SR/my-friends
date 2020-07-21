const {
	promisify
} = require("util");
const redis = require("redis")
// const client = redis.createClient({
// 	'host': 'us1-infinite-kodiak-30516.lambda.store',
// 	'port': 30516,
// 	'password': 'ee2693dace424efe8721492eb08e4024'
// });
const client = redis.createClient({
	'host': 'redis-11195.c8.us-east-1-2.ec2.cloud.redislabs.com',
	'port': 11195,
	'password': 'LMHmSdCZlmx9gGJFWska5BgnEfT27ME6'
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const geoAddAsync = promisify(client.geoadd).bind(client);
const geoRadiusAsync = promisify(client.georadius).bind(client);
const sendCommandAsync = promisify(client.send_command).bind(client);


class RedisService {

	constructor(arg) {

	}

	async postUserSession(token, user) {

	}

	/**
	 * Post object in redis
	 * 
	 * @param {Object} key
	 * @param {Object} object
	 */
	async postObject(key, object) {
		let setObject = await sendCommandAsync('set', [key, object])
		console.log("Object are cached for key:%s - %s", key, setObject)

		return setObject
	}

	/**
	 * Get object in redis
	 * 
	 * @param {Object} key
	 */
	async getObject(key) {
		let object = await sendCommandAsync('get', [key])
		console.log("Retrieved cached object for key: %s - %s", key, JSON.stringify(object))

		return object
	}

	/**
	 * Add geo item
	 * 
	 * @param {Object} key
	 * @param {Object} longitude
	 * @param {Object} latitude
	 * @param {Object} name
	 */
	async geoAdd(key, longitude, latitude, name) {
		return await sendCommandAsync('geoadd', [key, longitude, latitude, name])
		console.log('Add geo object: %s', JSON.stringify(object))
		
		return object
	}
	
	/**
	 * Get member by geo radius
	 * 
	 * @param {Object} key
	 * @param {Object} longitude
	 * @param {Object} latitude
	 * @param {Object} radius
	 * @param {Object} units
	 */
	async geoRadius(key, longitude, latitude, radius, units, number) {
		let result = await sendCommandAsync('georadius', [key, longitude, latitude, radius, units, 'WITHCOORD', 'WITHDIST', 'ASC', 'COUNT', number])
		console.log('Nearby group: %s', JSON.stringify(result))
		
		return result
		// return await geoRadiusAsync(key, longitude, latitude, radius, units, 'WITHCOORD', 'WITHDIST', 'ASC', 'COUNT', number)
	}
}

module.exports = {
	RedisService
}
