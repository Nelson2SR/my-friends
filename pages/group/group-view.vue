<template>
	<view class="group-view">
		<view class="uni-flex uni-row">
			<view class="flex-item banner">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="flex-item group-info">
				<view class="group-name">王者荣耀群</view>
				<view class="group-detail">
					<view class="group-size">1</view>
					<view class="group-access">Public group</view>
					<view class="group-category">Badminton</view>
				</view>
				<view class="group-action">
					<button type="default">Invite</button>
					<button type="default">Share</button>
				</view>
			</view>
			<view class="flex-item group-admins">
				<!-- list of admin avatar -->
			</view>
			<view class="flex-item group-members">
				<!-- list of member avatar -->
			</view>
			<view class="flex-item group-location">
				<text>Singapore</text>
			</view>
			<view class="flex-item group-description">
				<text>加入我们</text>
			</view>
			<view class="flex-item group-join-method">
				<text>需要admin同意</text>
			</view>
			<view class="flex-item group-description">
				<text>Last active 41 minutes ago</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.flex-item {
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-item-V {
		width: 100%;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
	}
</style>
