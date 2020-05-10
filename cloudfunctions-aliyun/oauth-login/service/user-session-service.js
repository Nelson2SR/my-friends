const db = uniCloud.database()
const expireDurationInMin = 30

class UserSessionService {
	constructor(arg) {
	    
	}
	
	/**
	 * Store user session
	 * 
	 * @param {Object} sessionKey
	 * @param {Object} openId
	 */
	async storeUserSession( sessionKey, openId ) {
		// store session_key
		const collection = db.collection('userSession')
		const now = new Date()
		const expiredAt = new Date(now.getTime() + expireDurationInMin*60000)
		const userSession = {
			session_key: sessionKey,
			open_id: openId,
			createdAt: now.toISOString(),
			expiredAt: expiredAt.toISOString()
		}
		console.log('Store user session: %s', JSON.stringify(userSession))
		const result = await collection.add(userSession)
		
		return result;
	}
	
	/**
	 * Get user session
	 * 
	 * @param {Object} id
	 */
	async getUserSession( id ) {
		const collection = db.collection('userSession')
		const userSession = await collection.doc(id).get();
		
		return userSession;
	}
}

module.exports = {
	UserSessionService: UserSessionService
}