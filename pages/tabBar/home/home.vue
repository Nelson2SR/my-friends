<template>
	<view class="container groups">
		<view class="group-title">
			<text class="title">Your groups</text>
			<navigator url="/pages/group/group-create" hover-class="navigator-hover">
				<button type="default">创建群组</button>
			</navigator>
			<uploadFile></uploadFile>
		</view>
		<view class="example-box">
			<uni-card :is-shadow="true" title="uni-app 框架" mode="style" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg"
			 extra="SR 2019-05-20 12:32:19" note="true" @click="clickCard">
				<text class="content-box-text">王者荣耀爱好群</text>
				<block slot="footer">
					<view class="footer-box">
						<view class="" @click.stop="footerClick('喜欢')"><text class="footer-box__item"> 喜欢</text></view>
						<view class="" @click.stop="footerClick('评论')"><text class="footer-box__item"> 评论</text></view>
						<view class="" @click.stop="footerClick('分享')"><text class="footer-box__item"> 分享</text></view>
					</view>
				</block>
			</uni-card>
		</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<image src="../../../static/logo.png"></image>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<image src="../../../static/logo.png"></image>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<image src="../../../static/logo.png"></image>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="container calendar">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" :style-type="styleType"
			 :active-color="activeColor"></uni-segmented-control>
			<view class="content">
				<view v-if="current === 0">
					<text class="content-text">选项卡1的内容</text>
				</view>
				<view v-if="current === 1">
					选项卡2的内容
				</view>
				<view v-if="current === 2">
					选项卡3的内容
				</view>
				<view v-if="current === 3">
					选项卡4的内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniSection,
			uniCard,
		},
		data() {
			return {
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
