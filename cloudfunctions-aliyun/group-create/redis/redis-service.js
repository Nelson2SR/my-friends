const {
	promisify
} = require("util");
const redis = require("redis")
const client = redis.createClient({
	'host': 'redis-11195.c8.us-east-1-2.ec2.cloud.redislabs.com',
	'port': 11195,
	'password': 'LMHmSdCZlmx9gGJFWska5BgnEfT27ME6'
});

const sendCommandAsync = promisify(client.send_command).bind(client);


class RedisService {

	constructor(arg) {

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
		let object = await sendCommandAsync('geoadd', [key, longitude, latitude, name])
		console.log('Add geo object: %s', JSON.stringify(object))
		
		return object
	}
}

module.exports = {
	RedisService
}
