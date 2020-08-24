const algoliasearch = require("algoliasearch")
//Application name: MyFriends
const client = algoliasearch("T4NL7X3JCR", "0188061be5eb6689073d9213afece83c")
const index = client.initIndex("global-search")

index.setSettings({
	searchableAttributes: [
		'name',
		'description'
	],
	customRanking: ['desc(read)'],
}).then(() => {
	console.log('Successfully configure algolia index')
});

class GroupCacheable {
	constructor(group) {
		this.group = group
	}

	getGroup() {
		return this.group
	}
}

class GlobalSearch {
	constructor() {

	}

	/**
	 * Save objects in Algolia
	 * @param {Array} objects
	 */
	async saveObjects(objects) {
		return await index.saveObjects(objects)
		// await index
		// 	.saveObjects(objects)
		// 	.then(({
		// 		objectIDs
		// 	}) => {
		// 		console.log(objectIDs)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
	}
	
	/**
	 * Search object in Algolia
	 * @param {Object} query
	 * @param {Object} page
	 */
	async search(query, page) {
		return await index.search(query)
		// await index
		// 	.search(query)
		// 	.then(({
		// 		hits
		// 	}) => {
		// 		console.log(hits)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
	}
}

module.exports = {
	GlobalSearch
}
