const {
	promisify
} = require("util");
const redis = require("redis")
// lambda store not support 'GEOADD'
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
	
	/**
	 * Update group view count
	 * 
	 * @param {Object} key
	 * @param {Object} userId
	 */
	async updateGroupView(groupId, userId) {
		const groupViewKey = "mf:group:view:"+groupId
		const groupKey = "mf:group:"+groupId
		const groupScoreKey = "mf:group:score"
		
		let self = new RedisService()
		let addGroupView = await self.sendCommand('sadd', [groupViewKey, userId])
		let increaseViewInGroup = await self.increaseViewInGroup(groupKey, 1)
		let increaseGroupScore = await self.sendCommand('zincrby', [groupScoreKey, 1, groupKey])
		
		Promise.all([addGroupView, increaseViewInGroup, increaseGroupScore])
			.then(res => {
				console.log("Update Group View result: %s", JSON.stringify(res))
				return res
			})
			.catch(err => {
				console.log("Error updates group view result: %s", err)
				
				return null
			})
	}
	
	async increaseViewInGroup(groupKey, number) {
		let self = new RedisService()
		let groupString = await self.getObject(groupKey)
		console.log("Result group: %s", groupString)
		const group = JSON.parse(groupString)
		group.read = group.read + number
		console.log("Updated group: %s", JSON.stringify(group))
		return await self.postObject(groupKey, JSON.stringify(group))
		
	}
	
	async sendCommand(action, params) {
		console.log('action %s and params %s', action, JSON.stringify(params))
		return await sendCommandAsync(action, params)
	}
	
	/**
	 * Get groups by score
	 * 
	 * @param {Object} key
	 * @param {Object} maxNum
	 * @param {Object} minNum
	 */
	async getGroupsByScore(maxNum, minNum) {
		const groupScoreKey = "mf:group:score"
		const result = await sendCommandAsync('ZREVRANGEBYSCORE', [groupScoreKey, maxNum, minNum])
		console.log('Get group by view result: %s', result)
		
		return result
	}
}

module.exports = {
	RedisService
}
