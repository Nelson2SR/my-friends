<template>
	<view class="cu-card dynamic margin-top" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{backgroundImage: `url(${item.owner.avatarUrl})`}"></view>
					<view class="content flex-sub">
						<view>{{ item.owner.name }}</view>
						<view class="text-gray text-sm flex justify-between">
							{{ createdAt }}
						</view>
					</view>
				</view>
			</view>
			<view class="text-content">
				{{ item.content }}
			</view>
			<view class="grid flex-sub padding-lr" :class="imgCol">
				<view class="bg-img" v-for="img in item.imgUrls">
					<image :src="img" mode="aspectFill"></image>
				</view>
			</view>
			<view class="text-gray text-sm text-right padding">
			<!-- 	<text class="cuIcon-attentionfill margin-lr-xs"></text> 0 -->
				<text class="cuIcon-appreciatefill margin-lr-xs" :class="hasLikePost?'text-red':''"></text> {{ postLikeCount }}
				<text class="cuIcon-messagefill margin-lr-xs"></text> {{ comments.length }}
			</view>

			<view class="action-button">
				<button type="default" @click="likePost">like</button>
				<button type="default" @click="viewComment">comment</button>
			<!-- 	<button type="default">share</button> -->
			</view>
			
			<view class="cu-list menu-avatar comment solids-top" v-if="showComment" v-for="(comment, index) in comments" :key="index">
				<view class="cu-item">
					<view class="cu-avatar round" :style="{backgroundImage: `url(${comment.fromUser.avatarUrl})`}"></view>
					<view class="content">
						<view class="text-grey">{{comment.fromUser.name}}</view>
						<view class="text-gray text-content text-df">
							{{comment.content}}
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm" v-if="comment.replies.length > 0" v-for="(reply, index) in comment.replies" :key="index">
							<view class="flex">
								<view>{{reply.fromUser.name}}：{{reply.toUser.name}}</view>
								<view class="flex-sub">{{reply.content}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{comment.createdAt}}</view>
							<view>
								<text class="cuIcon-appreciatefill text-red" @click="likeComment"></text>
								<text class="cuIcon-messagefill text-gray margin-left-sm" @click="sendCommentOnComment" :id="comment._id"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" @input="inputTextArea" placeholder="写些什么..."></textarea>
				<button type="default" @click="sendCommentOnPost">发送</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
    import {
    	mapState,
    	mapMutations,
    	mapActions
    } from 'vuex'
	
	export default {
		data() {
			return {
				createdAt: '',
				imgCol: '',
				comments: [],
				showComment: true,
				textareaValue: '',
				sendOnComment: true,
				commentId:'',
				postLikeCount:0,
				hasLikePost: false
			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName', 'avatarUrl', 'gender', 'openId']),
			formatCreatedAt() {
				const now = moment.now()
				const createdAt = this.item.createdAt
				this.createdAt = moment(this.item.createdAt).calendar({
					sameDay: '[Today at] hh:mm',
					nextDay: '[Tomorrow]',
					nextWeek: 'dddd',
					lastDay: '[Yesterday at] hh:mm',
					lastWeek: '[Last] dddd [at] hh:mm',
					sameElse: 'DD/MM/YYYY [at] hh:mm'
				})
			},
			getImgCol() {

				if ( this.item.imgUrls.length === 1) {
					this.imgCol = 'col-1'
				}
				else if ( this.item.imgUrls.length % 3 === 0) {
					this.imgCol = 'col-3 grid-square'
				}
				else if ( this.item.imgUrls.length % 2 === 0 ) {
					this.imgCol = 'col-2 grid-square'
				}
				else {
					this.imgCol = 'col-3 grid-square'
				}
			},
			getPostLikeCount() {
				this.postLikeCount = this.item.likeCount.length
				// if(this.item.likeCount.contains(this.openId)){
				// 	this.hasLikePost = true
				// }
			}
		},
		mounted() {
			console.log('post component start to being mounted')
			self = this
			uniCloud.callFunction({
				name:'comment-get-by-topic',
				data:{
					'topicId': this.item._id,
					'topicType': 'post'
				}
			}).then(res => {
				console.log('successfully retrieved comment on post %s: %s', self.item._id, JSON.stringify(res.result.data))
				this.comments = res.result.data
			}).catch(err => {
				console.error('Error occur while retrieving comment on post %s', self.item._id)
			})
		},
		methods:{
			likePost() {
				const data = {
					'topicId':this.item._id,
					'topicType':'post',
					'fromUserId': this.openId
				}
				console.log('start liking post %s', JSON.stringify(data))
			    uniCloud.callFunction({
			    	name:'like-update-by-topic',
					data:data
			    }).then(res => {
					console.log('Successfully like post %s', JSON.stringify(res))
					this.postLikeCount = res.result.data.likeCount.length
					this.hasLikePost = true
				}).catch(err => {
					console.error("Error occurs while liking post")
				})		
			},
			likeComment(){
				uniCloud.callFunction({
					name:'like-update-by-topic',
					data:{
						'topicId':this.item._id,
						'topicType':'comment',
						'fromUserId': this.openId
					}
				}).then(res => {
					console.log('Successfully like comment %s', JSON.stringify(res))
				}).catch(err => {
					console.error("Error occurs while liking comment")
				})		
			},
			viewComment() {
				this.showComment = true
			},
			inputTextArea(e) {
				this.textareaValue = e.detail.value
			},
			sendCommentOnPost() {
				if ( this.textareaValue !== '' ) {
					if ( !this.sendOnComment ) {
						uniCloud.callFunction({
							name:'comment-create',
							data: {
								'topicId':this.item._id,
								'topicType':'post',
								'fromUser':{
									'userId':this.openId,
									'gender':this.gender,
									'avatarUrl':this.avatarUrl,
									'name':this.userName
								},
								'content':this.textareaValue,
								'likeCount':[],
								'status':'ACTIVE'
							}
						}).then(res => {
							console.log('successfully created comment on post %s', JSON.stringify(res.result))
						})
					}
					else {
						uniCloud.callFunction({
							name:'comment-create',
							data: {
								'topicId':this.commentId,
								'topicType':'comment',
								'fromUser':{
									'userId':this.openId,
									'gender':this.gender,
									'avatarUrl':this.avatarUrl,
									'name':this.userName
								},
								'toUser':{
									'userId':this.openId,
									'gender':this.gender,
									'avatarUrl':this.avatarUrl,
									'name':this.userName
								},
								'content':this.textareaValue,
								'likeCount':[],
								'status':'ACTIVE'
							}
						}).then(res => {
							console.log('successfully created comment on post %s', JSON.stringify(res.result))
						})
					}
					
				}
			},
			sendCommentOnComment(e) {
				console.log("comment's id: %s", JSON.stringify(e.target.id))
				this.sendOnComment = true
				this.commentId = e.target.id
			}
		}
	}
</script>

<style>
</style>
