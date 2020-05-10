<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">我的</block>
		</cu-custom>

		<!-- login module -->
		<view class="bg-img bg-mask flex align-center" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');height: 414upx;">
			<view class="flex padding text-white" v-if="hasLogin">
				<view class="padding-lg margin-xs radius">
					<view class="cu-avatar round lg margin-left" :style="{backgroundImage:'url(' + avatarUrl + ')'}">
						<view class="cu-tag badge" :class="gender%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					</view>
				</view>

				<view class="padding-sm margin-xs radius text-lg">
					<text :value="userName">{{userName}}</text>
				</view>
			</view>

			<view class="flex padding text-white" v-else>
				<view class="padding-lg margin-xs radius">
					<view class="cu-avatar round lg margin-left" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]">
						<view class="cu-tag badge" :class="index%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					</view>
				</view>

				<view class="padding-sm margin-xs radius text-lg">
					请登陆/注册你的账号
					<button type="default" v-on:click="login_weixin">点击登陆</button>
				</view>
			</view>
		</view>

		<!-- my groups module -->
		<!-- #ifndef MP-ALIPAY -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-pink"></text> 我的群组
			</view>
		</view>
		<cu-swiper :swiperList="myGroups" v-if="myGroups.length > 0"></cu-swiper>
		<view class="solids-bottom padding-xs flex align-center" v-else>
			<view class="flex-sub text-center">
				<view class="solid-bottom text-df padding">你还没加入任何群组</view>
			</view>
		</view>
		<!-- #endif -->
		
		<!-- my interest -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-pink"></text> 我的爱好
			</view>
		</view>

		<cu-bar></cu-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	
	import cuSwiper from '../../colorui/components/cu-swiper.vue'

	export default {
		data() {
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				],
				provider: '',
				myGroups: [],

			}
		},
		components: {
			cuSwiper
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'avatarUrl', 'gender', 'openId']),
		methods: {
			...mapActions(['login']),
			login_weixin() {
				//微信登录
				console.log('login as wechat')
				let self = this;
				wx.login({
					success(res) {
						console.log('login response: %s', JSON.stringify(res))
						if (res.code) { //发起网络请求 
							uniCloud.callFunction({
								name: 'oauth-login',
								data: {
									code: res.code,
									appId: 'wx95bd5dc2182e3ad4',
									appSecret: 'f51b12f21d601c68fb1fbc3bb1aea1ac'
								}
							}).then(res => {
								console.log('OAuth Response: %s', JSON.stringify(res))
								const openId = res.result.open_id
								uni.setStorage({
									"sessionId": res.result.session_id,
									"openId": res.result.open_id
								})

								const user = self.getUser(openId);

								uni.getUserInfo({
									provider: 'weixin',
									success(infoRes) {
										console.log('User Info: %s', JSON.stringify(infoRes));
										infoRes.userInfo.openId = openId
										self.toMain(infoRes.userInfo);
									},
									fail() {
										uni.showToast({
											icon: 'none',
											position: 'bottom',
											title: '登陆失败'
										});

									}
								})
							})


						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			toMain(userInfo) {
				this.login(userInfo);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '/pages/tabBar/home/home',
					});
				} else {
					uni.redirectTo({
						url: '/pages/profile/profile'
					})
				}
			},
			getUser(openId) {
				let self = this;
				console.log('Check if user registered');
				uniCloud.callFunction({
					name: "user-get-by-openId",
					data: {
						open_id: openId
					}
				}).then(res => {
					console.log('get user successfully: %s', JSON.stringify(res))

					if (res.result.data.length === 0) {
						console.log('User not found')
						const user = self.createUser(openId)

						return user;
					} else {
						console.log('User is retrieved: %s', JSON.stringify(res.result.data[0]))
						return res.result.data[0]
					}
				})
			},
			createUser(openId) {
				let user = {};
				user.name = this.userName;
				user.provider = this.provider;
				user.gender = this.gender;
				user.open_id = openId;

				uniCloud.callFunction({
					name: "user-create",
					data: user
				}).then(res => {
					console.log('create user successully: %s', JSON.stringify(res))
					return res.result.id
				})
			}
		},
		onLoad() {
			console.log('Page onLoad' + this.openId);

			if (this.openId !== '') {
				uniCloud.callFunction({
						name: 'group-get-by-openId',
						data: {
							openId: this.openId
						}
					})
					.then(res => {
						console.log('My Groups: %s', JSON.stringify(res))
						this.myGroups = res.result.data;
					});
			}
		}
	}
</script>

<style>

</style>
