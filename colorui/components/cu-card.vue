<template>
	<view class="cu-card case" :class="isCard?'no-card':''" @click="onClick(item)">
		<view class="cu-item shadow">
			<view class="image">
				<image :src="item.imgUrl" mode="widthFix"></image>
				<view class="cu-tag bg-blue" name="type">{{ item.type.name }}</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut" name="description">{{ item.description }}</text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{ backgroundImage: `url(${item.owner.avatarUrl})` }"></view>
					<view class="content flex-sub">
						<view class="text-grey" name="name">{{ item.name }}</view>
						<view class="text-gray text-sm flex justify-between">
							十天前
							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> {{ item.read }}
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{ item.vote }}
								<text class="cuIcon-messagefill margin-lr-xs"></text> {{ item.comment }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		methods: {
			onClick(e) {
				console.log("The card value:" + e)
				uni.navigateTo({
					url: "/pages/group/group-view?id=" + e._id
				})
			}
		},
		onLoad: function() {

		}
	}
</script>

<style>
</style>
