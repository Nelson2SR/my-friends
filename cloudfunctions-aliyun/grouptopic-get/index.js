'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const collection = db.collection('groupTopic')
	const res = await collection.aggregate()
		.lookup({
			from:'groupType',
			localField:"_id",
			foreignField:"groupTopicId",
			as:"groupTypes"
		})
		.end();
	console.log("Successfully retrieved aggregated groupTopics: %s", JSON.stringify(res))	
	return res
};
