<template>
	<view class="group-view">
		<cu-custom bgColor="bg-gradual-pink" :bgImage="item.imgUrl" :isBack="true">
			<block slot="backText"></block>
			<!-- <block slot="content">表单</block> -->
		</cu-custom>
		
		
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center col-1">
				<view class="basis-max bg-white margin-xs padding-sm radius group-name text-bold text-xl">{{item.name}}</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-name text-bold">{{item.visibility}} - {{item.members.length}} MEMBERS</view>
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
			
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	
	export default {
		components: {

		},
		data() {
			return {
				avatar: [],
				item: {},
				TabCur: 0,
				scrollLeft: 0,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				isMember: false
			}
		},
		computed: mapState(['openId', 'gender', 'avatarUrl']),
		
		onLoad: function(options) {
			self = this;
			console.log(options.id);
			console.log("OpenId : %s", self.openId);
			
			uniCloud.callFunction({
					name: 'group-get-by-docId',
					data: {
						id: options.id
					}
				})
				.then(res => {
					console.log("group detail: %s" + JSON.stringify(res));
					this.item = res.result.data[0];
					this.item.members.forEach((member) => {
						self.avatar.push(member.avatarUrl)
						console.log("member openId: %s, this user openId: %s", member.openId, self.openId)
						if ( member.openId === self.openId ) {
							self.isMember = true
						}
					});
				});
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
				const newMember =  {
					'openId': this.openId,
					'gender': this.gender,
					'avatarUrl': this.avatarUrl
				}
				currentMembers.push(newMember)
				this.item.members = currentMembers
				uniCloud.callFunction({
					name:'group-update',
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
