<template>
	<view class="group-view">
		<view class="uni-flex uni-row">
			<view class="flex-item banner">
				<image :src="item.imgId" mode=""></image>
			</view>
			<view class="flex-item group-info">
				<view class="flex-item group-name">{{item.name}}</view>
				<view class="flex-item group-detail">
					<view class="flex-item group-size">1</view>
					<view class="flex-item group-access">{{item.visibility}}</view>
					<view class="flex-item group-category">Interest</view>
				</view>
				<view class="flex-item group-action">
					<button type="flex-item default">Invite</button>
					<button type="flex-item default">Share</button>
				</view>
			</view>
			<view class="flex-item group-admins">
				<text>No admins yet</text>
			</view>
			<view class="flex-item group-members">
				<text>No members yet</text>
			</view>
			<view class="flex-item group-location">
				<text>Singapore</text>
			</view>
			<view class="flex-item group-description">
				<text>{{item.description}}</text>
			</view>
			<view class="flex-item group-join-method">
				<text>{{item.joinMethod}}</text>
			</view>
			<view class="flex-item group-activeness">
				<text>Last active 41 minutes ago</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			
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
