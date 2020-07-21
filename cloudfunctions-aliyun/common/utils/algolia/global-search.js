const algoliasearch = require("algoliasearch")
//Application name: MyFriends
const client = algoliasearch("T4NL7X3JCR", "0188061be5eb6689073d9213afece83c")
const index = client.initIndex("global-search")

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

	async saveObjects(objects) {
		await index
			.saveObjects(objects)
			.then(({
				objectIDs
			}) => {
				console.log(objectIDs)
			})
			.catch(err => {
				console.log(err)
			})
	}

	async search(query, page) {
		await index
			.search(query)
			.then(({
				hits
			}) => {
				console.log(hits)
			})
			.catch(err => {
				console.log(err)
			})
	}
}

module.exports = {
	GlobalSearch
}
