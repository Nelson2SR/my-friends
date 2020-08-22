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
	 * Get member by geo radius
	 * 
	 * @param {Object} key
	 * @param {Object} longitude
	 * @param {Object} latitude
	 * @param {Object} radius
	 * @param {Object} units
	 */
	geoRadius(key, longitude, latitude, radius, units, number) {
			return new Promise((resolve, reject) => {
				sendCommandAsync('georadius', [key, longitude, latitude, radius, units, 'WITHCOORD', 'WITHDIST', 'ASC', 'COUNT', number], function(err, data) {
					if (err) {
						console.error('Geo Radius get error: ' + JSON.stringify(err))
						reject(err)
					}
					else {
						console.log('Geo Radius result: %s', JSON.stringify(data))
						resolve(data)
					}
				})
			})
		}
}

module.exports = {
	RedisService
}
