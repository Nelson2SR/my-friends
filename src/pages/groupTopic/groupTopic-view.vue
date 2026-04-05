<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{name}}</block>
		</cu-custom>
		
		<view class="group-type" v-for="(groupType, index) in groupTypes" :key="index">
			<!-- group type module -->
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text> {{groupType.name}}
				</view>
			</view>
			<cu-swiper :swiperList="groupType.groups" v-if="groupType.groups.length > 0"></cu-swiper>
			<view class="solids-bottom padding-xs flex align-center" v-else>
				<view class="flex-sub text-center">
					<view class="solid-bottom text-df padding">还没创建任何群组</view>
				</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import cuSwiper from "@/colorui/components/cu-swiper.vue"
	export default {
		components:{
			cuSwiper
		},
		data() {
			return {
				name:{},
				groupTypes:[]
			}
		},
		methods: {
			
		},
		onLoad(options) {
			// uni.showLoading({
			// 	title: '加载中...'
			// })
			console.log("GroupTopic Id: %s", options.id)
			uniCloud.callFunction({
				name:'group-get-by-topicId',
				data:{
					id:options.id
				}
			}).then(res => {
				const groupTopicData = res.result.data
				console.log("Successfully retrieved groups by groupTopic: %s", JSON.stringify(groupTopicData))
				this.name = groupTopicData[0].name
				groupTopicData.forEach(groupTopicRecord => {
					let groupType = groupTopicRecord.groupTypes
					groupType["groups"] = groupTopicRecord.groups
					this.groupTypes.push(groupType )
				})
				console.log("groupTypes: %s", JSON.stringify(this.groupTypes))
				
			}).catch(err => {
				console.log("Error occurs while retrieving groups by groupTopic: %s", JSON.stringify(err))
			})
		}
	}
</script>

<style>

</style>
