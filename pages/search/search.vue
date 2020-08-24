<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">MY同伴</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索group" @tap="searchIcon"></input>
			</view>
		</view>
		
		<view class="example-box">
			<!-- <text>人气群组</text> -->
			<view class="group-list" v-for="(group, key) in groups" :key="key">
				<cu-card :item="group"></cu-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				groups: []
			}
		},
		methods: {
			searchIcon() {
				// console.log('input element: %s', JSON.stringify(e.target.value))
				let keyword = "游戏"
				uniCloud.callFunction({
					name:'group-search',
					data:{
						"keyword": keyword
					}
				}).then(res => {
					console.info('search result: %s', JSON.stringify(res))
					this.groups = res.result.data;
				}).catch(err => {
					console.error('error while searching: %s', JSON.stringify(err))
				})
				
			}
		},
		mounted:function() {
			// console.log('Search page loaded')
			// const searchInput = this.$refs["searchInput"]
			// searchInput.click()
		}
	}
</script>

<style>

</style>
