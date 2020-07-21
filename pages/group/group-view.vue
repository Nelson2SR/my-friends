<template>
	<view class="group-view">
		<cu-custom bgColor="bg-gradual-pink" :bgImage="item.imgUrl" :isBack="true">
			<block slot="backText"></block>
			<!-- <block slot="content">表单</block> -->
		</cu-custom>
		
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center col-1">
				<view class="basis-max bg-white margin-xs padding-sm radius group-name text-bold text-xl">{{item.name}}</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-name text-bold">{{item.visibility}} -
					{{item.members.length}} MEMBERS</view>
			</view>

			<view class="padding">
				<view class="cu-avatar-group">
					<view class="cu-avatar round lg" v-for="(i,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
				</view>
			</view>


			<view class="padding flex flex-direction" v-if="isMember">
				<button class="cu-btn bg-blue margin-tb-sm lg" @click="inviteFriend(item)">Invite</button>
			</view>
			<view class="padding flex flex-direction" v-else>
				<button class="cu-btn bg-blue margin-tb-sm lg" @click="joinGroup(item)">Join</button>
			</view>

			<!-- <view class="grid margin-bottom text-center col-1 justify-center">
				<button type="default" class="cu-btn round lines-blue shadow" @click="inviteFriend(item)">Invite</button>
			</view>
			 -->
			<view class="grid margin-bottom text-center col-1">
				<view class="basis-max bg-white margin-xs padding-sm radius group-name">{{item.description}}</view>
			</view>
			
			<view class="page-section page-section-gap" v-if="item.place != null">
				<map style="width: 100%; height: 300px;" :latitude="item.place.latitude" :longitude="item.place.longitude" :covers="covers">
				</map>
			</view>
			

		</view>

		<view class="cu-bar search bg-white margin-top" v-if="isMember">
			<view class="cu-avatar round" :style="{backgroundImage: `url(${avatarUrl})`}"></view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="写点什么" confirm-type="search" @click="writePost"></input>
			</view>
		</view>

		<view v-if="isMember & posts.length > 0" v-for="post in posts">
			<cu-post :item="post"></cu-post>
		</view>


	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	import cuPost from '@/colorui/components/cu-post.vue'

	export default {
		components: {
			cuPost
		},
		data() {
			return {
				groupId: '',
				avatar: [],
				posts: [],
				item: {},
				TabCur: 0,
				scrollLeft: 0,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				isMember: false,
				covers:[]
			}
		},
		computed: mapState(['openId', 'gender', 'avatarUrl']),

		onLoad: function(options) {
			console.log('Page loaded')
			uni.showLoading({
				title: '加载中...'
			})
			self = this;
			console.log(options.id);
			console.log("OpenId : %s", self.openId);
			this.groupId = options.id;

			uniCloud.callFunction({
					name: 'group-get-by-docId',
					data: {
						id: options.id
					}
				})
				.then(res => {
					uni.hideLoading()
					console.log("group detail: %s", JSON.stringify(res));
					self.item = res.result.data;
					console.log("result: %s", JSON.stringify(self.item))
					if (self.item.place != null) {
						self.getCovers(self.item.place)
					}
					self.item.members.forEach((member) => {
						self.avatar.push(member.avatarUrl)
						console.log("member openId: %s, this user openId: %s", member.openId, self.openId)
						if (member.openId === self.openId) {
							self.isMember = true
						}
					});
				})
				.catch(err => {
					uni.hideLoading()
					console.error("Error occur while retriving group detail.")
				});

			if (this.isMember) {
				uniCloud.callFunction({
					name: 'post-get-by-groupId',
					data: {
						groupId: options.id
					}
				}).then(res => {
					console.log("posts detail: %s", JSON.stringify(res));
					this.posts = res.result.data;
				}).catch(err => {
					console.error("Error retrieving posts")
				})
			}
		},
		onReady() {
			console.log('Page Ready')
		},
		onShow() {
			console.log('Page shown')

			uniCloud.callFunction({
				name: 'post-get-by-groupId',
				data: {
					groupId: this.groupId
				}
			}).then(res => {
				console.log("posts detail: %s", JSON.stringify(res));
				this.posts = res.result.data;
			}).catch(err => {
				console.error("Error retrieving posts")
			})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res)
			}
			return {
				title: this.item.name,
				path: '/pages/group/group-view?id=' + this.item._id,
				imageUrl: this.item.imgId,
				// desc: this.item.description,
				success: function() {
					console.log("share success")
				},
				fail: function() {
					console.log("share fail")
				},
				complete: function() {
					console.log("share complete")
				}
			}
		},
		methods: {
			inviteFriend(e) {
				console.log("start to invite friends to %s", e._id)
			},
			joinGroup(e) {
				console.log("start to join group %s", e._id)
				const currentMembers = this.item.members
				const newMember = {
					'openId': this.openId,
					'gender': this.gender,
					'avatarUrl': this.avatarUrl
				}
				currentMembers.push(newMember)
				this.item.members = currentMembers
				uniCloud.callFunction({
					name: 'group-update',
					data: {
						'group': this.item
					}
				}).then(res => {
					console.log("group detail: %s" + JSON.stringify(res));
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			writePost(e) {
				console.log('Navigate to write post')
				uni.navigateTo({
					url: '/pages/post/post-create?groupId=' + this.item._id + '&groupName=' + this.item.name,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			getCovers(place) {
				const cover = {
					'longitude': place.longitude,
					'latitude': place.latitude,
					'iconPath': '../../static/location.png'
				}
				this.covers.push(cover)
			}
		}
	}
</script>

<style>
	. {
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.-V {
		width: 100%;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
	}
</style>
