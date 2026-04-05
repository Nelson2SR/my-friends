<template>
	<view class="cu-bar tabbar margin-top-sm bg-white">
		<view class="action text-gray">
			<view class="cuIcon-homefill" v-on:click="viewHome"></view> 首页
		</view>
		<view class="action text-gray">
			<view class="cuIcon-similar" @click="exploreGroup"></view> 探索
		</view>
		<view class="action text-gray add-action">
			<button class="cu-btn cuIcon-add bg-gradual-blue shadow" @click="onCreateGroup"></button>
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
		
		<view class="cu-modal bottom-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="doAction">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					请先登录！
				</view>
			</view>
		</view>
<!-- 		<cu-dialog :showModal="showModal" :modalDetail="modalDetail" :confirmAction="confirmAction"></cu-dialog> -->
	</view>
</template>

<script>
	import cuDialog from "../../colorui/components/cu-dialog.vue"
	import {
		mapState
	} from 'vuex'
	
	export default {
		components:{
			cuDialog
		},
		
		data() {
			return {
				showModal: false,
				modalDetail: {},
				confirmAction: function() {
						uni.redirectTo({
							url: "/pages/profile/profile"
						})
					}
			}
		},
		computed: mapState(['hasLogin']),
		methods:{
			onCreateGroup() {
				console.log('HasLogin: %s', this.hasLogin)
				if ( !this.hasLogin ) {
					this.showModal = true
				}
				else {
					uni.navigateTo({
						url: "/pages/group/group-create"
					})
				}
			},
			exploreGroup() {
				uni.redirectTo({
					url: "/pages/tabBar/explore/explore"
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
			},
			hideModal(e) {
				this.showModal = false
			},
			doAction() {
				uni.redirectTo({
					url: "/pages/profile/profile"
				})
			}
		}
	}
</script>

<style>
</style>
