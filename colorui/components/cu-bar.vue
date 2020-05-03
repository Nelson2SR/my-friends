<template>
	<view class="cu-bar tabbar margin-bottom-xl bg-white">
		<view class="action text-green">
			<view class="cuIcon-homefill" v-on:click="viewHome"></view> 首页
		</view>
		<view class="action text-gray">
			<view class="cuIcon-similar"></view> 分类
		</view>
		<view class="action text-gray add-action">
			<button class="cu-btn cuIcon-add bg-green shadow" @click="onCreateGroup"></button>
			创建
		</view>
		<view class="action text-gray">
			<view class="cuIcon-cart">
				<view class="cu-tag badge" name="notification-number"></view>
			</view>
			消息
		</view>
		<view class="action text-gray" @click="viewProfile">
			<view class="cuIcon-my">
				<view class="cu-tag badge"></view>
			</view>
			我的
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			onCreateGroup() {
				uni.navigateTo({
					url: "/pages/group/group-create"
				})
			},
			viewProfile() {
				uni.redirectTo({
					url: "/pages/profile/profile"
				})
			},
			viewHome() {
				uni.redirectTo({
					url: "/pages/tabBar/home/home"
				})
			}
		}
	}
</script>

<style>
</style>
