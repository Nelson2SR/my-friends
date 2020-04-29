<template>
	<view class="container groups">
		<view class="group-title">
			<text class="title">Your groups</text>
			<uploadFile></uploadFile>
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
	export default {
		components: {

		},
		data() {
			return {
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
			createGroup(e) {

			}
		},
		onLoad: function() {
			const owner = 'userId';
			uniCloud.callFunction({
					name: 'group-get-by-ownerId',
					data: {
						owner: owner
					}
				})
				.then(res => {
					this.myGroups = res.result.data;
				});
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
</style>
