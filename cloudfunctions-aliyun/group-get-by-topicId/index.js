'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event:' + event)
	const dbCmd = db.command
	const collection = db.collection('groupTopic')

	const res = await collection
		.aggregate()
		.lookup({
			from:'groupType',
			localField:'_id',
			foreignField:"groupTopicId",
			as:"groupTypes"
		})
		.unwind({
			path:"$groupTypes",
			preserveNullAndEmptyArrays:true
		})
		.lookup({
			from:"group",
			localField:"groupTypes.name",
			foreignField:"type.name",
			as:"groups"
		})
		.project({
			_id: 1,
			name: 1,
			groupTypes:1,
			groups: {
				_id:1,
				imgUrl:1,
				name:1,
				read:1,
				visibility:1
			}
		})
		.match({
			_id:event.id
		})
		.end()
		// .lookup({
		// 	from: 'groupType',
		// 	let:{
		// 		group_topic_id: '$_id'
		// 	},
		// 	pipeline: $.pipeline()
		// 		.match({
		// 			groupTopicId: $$group_topic_id
		// 		})
		// 		.project({
		// 			_id:1,
		// 			name:1,
		// 			groupTopicId:0
		// 		})
		// 		.done(),
		// 	as: "groupTypes"
		// })
		// .unwind({
		// 	path:"$groupTypes",
		// 	preserveNullAndEmptyArrays:true
		// })
		// .lookup({
		// 	from: "group",
		// 	localField: "name",
		// 	foreignField: "type.name",
		// 	as: "groups",
		// })
		// .match({
		// 	_id:event.id
		// }).end()

	console.log('Retrieved group: %s', JSON.stringify(res))
	return res
};
