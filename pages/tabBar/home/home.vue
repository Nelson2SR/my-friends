<template>
	<view class="container home">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">MY同伴</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索group" confirm-type="search" @input="searchIcon"></input>
			</view>
		</view>
		
		<view class="example-box">
			<view class="group-list" v-for="(group, key) in myGroups" :key="key">
				<cu-card :item="group"></cu-card>
			</view>
		</view>
		
		<cu-bar></cu-bar>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		components: {

		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'avatarUrl', 'gender', 'openId']),
		data() {
			return {
				CustomBar: this.CustomBar,
				myGroups: [],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				items: ['ALL', 'GOING', 'SAVED', 'PAST'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#007aff', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
				styleType: 'button'
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			searchIcon(e) {
				// let key = e.detail.value.toLowerCase();
				// let list = this.myGroups;
				// for (let i = 0; i < list.length; i++) {
				// 	let a = key;
				// 	let b = list[i].name.toLowerCase();
				// 	if (b.search(a) != -1) {
				// 		list[i].isShow = true
				// 	} else {
				// 		list[i].isShow = false
				// 	}
				// }
				// this.cuIcon = list
			}
		},
		onLoad: function() {
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
	.uni-margin-wrap {
		width: 690rpx;
		margin: 0 30rpx;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	/* card */
	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
	
	page {
		padding-top: 50px;
	}
</style>
