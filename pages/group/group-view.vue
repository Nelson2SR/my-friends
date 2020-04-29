<template>
	<view class="group-view">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">表单</block>
		</cu-custom>

		<view class="padding bg-white">
			<view class="flex flex-wrap">
				<view class="basis-max banner">
					<image :src="item.imgId" mode=""></image>
				</view>
				<view class="basis-max  group-info">
					<view class="basis-max bg-white margin-xs padding-sm radius group-name">{{item.name}}</view>
					<view class="basis-max bg-white margin-xs padding-sm radius group-detail">
						<view class="basis-max group-size">1</view>
						<view class="basis-max group-access">{{item.visibility}}</view>
						<view class="basis-max group-category">Interest</view>
					</view>
					<view class="basis-max bg-white margin-xs padding-sm radius group-action">
						<button type="default">Invite</button>
						<button type="default">Share</button>
					</view>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-admins">
					<text>No admins yet</text>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-members">
					<text>No members yet</text>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-location">
					<text>Singapore</text>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-description">
					<text>{{item.description}}</text>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-join-method">
					<text>{{item.joinMethod}}</text>
				</view>
				<view class="basis-max bg-white margin-xs padding-sm radius group-activeness">
					<text>Last active 41 minutes ago</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				item: {}
			}
		},
		onLoad: function(options) {
			console.log(options.id);
			uniCloud.callFunction({
					name: 'group-get-by-docId',
					data: {
						id: options.id
					}
				})
				.then(res => {
					console.log("success with" + JSON.stringify(res));
					this.item = res.result.data[0];
				});
		},
		methods: {

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
