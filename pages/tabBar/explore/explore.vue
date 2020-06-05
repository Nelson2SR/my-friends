<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">MY同伴</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>探索群组
			</view>
		</view>
		
		<view class="grid col-2 padding-sm">
			<view class="padding-sm" v-for="(groupTopic,index) in groupTopics" :key="index">
				<view :id="groupTopic._id" @click="viewGroupTopic" class="bg-img padding-sm radius text-center shadow-blur" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10007.jpg');height: 207upx;">
				</view>
				<view class="text-sm text-black">{{groupTopic.name}}</view>
			</view>
		</view>
		
		<cu-bar></cu-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupTopics: []
			}
		},
		methods: {
			viewGroupTopic(e) {
				console.log('e: %s', JSON.stringify(e))
				uni.navigateTo({
					url:'/pages/groupTopic/groupTopic-view?id='+e.target.id
				})
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:'grouptopic-get'
			}).then(res => {
				console.log("successfully retrieved groupTopics: %s", JSON.stringify(res.result.data))
				this.groupTopics = res.result.data
			})
		}
	}
</script>

<style>

</style>
