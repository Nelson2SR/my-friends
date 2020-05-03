<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">我的</block>
		</cu-custom>

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

		<cu-bar></cu-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				]
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'avatarUrl', 'gender']),
		methods: {
			...mapActions(['login']),
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '/pages/tabBar/home/home',
					});
				} else {
					uni.navigateBack();
				}
			},
			login_weixin() {
				//微信登录
				let self = this;
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						console.log(loginRes.authResult);

						//Get user info
						uni.getUserInfo({
							provider: 'weixin',
							success(infoRes) {
								console.log('User Info: %s', JSON.stringify(infoRes.userInfo));

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
					},
					fail(err) {
						console.error('授权登陆失败： %s', JSON.stringify(err))
					}
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>

</style>
