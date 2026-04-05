<template>
	<view class="container home">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content">MY同伴</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索group" confirm-type="search" @click="searchIcon"></input>
			</view>
		</view>

		<view class="example-box">
			<text>人气群组</text>
			<view class="group-list" v-for="(group, key) in popularGroups" :key="key">
				<cu-card :item="group"></cu-card>
			</view>
		</view>

		<!-- <view class="recommended-groups">
			<text>人气群组</text>
			<cu-swiper :swiperList="popularGroups" v-if="recommendedGroups.length > 0"></cu-swiper>
		</view>
		 -->
		<view class="example-box">
			<text>附近群组</text>
			<view class="group-list" v-for="(group, key) in nearbyGroups" :key="key" v-if="nearbyGroups.length > 0">
				<cu-card :item="group"></cu-card>
			</view>
		</view>

		<!-- <view class="nearby-groups">
			<text>附近群组</text>
			<cu-swiper :swiperList="nearbyGroups" v-if="nearbyGroups.length > 0"></cu-swiper>
		</view> -->

		<!-- <view class="recommended-users">
			<text>推荐用户</text>
			<cu-swiper :swiperList="recommendedPeoples" v-if="recommendedPeoples.length > 0"></cu-swiper>
		</view>
 -->
		<cu-bar></cu-bar>
	</view>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useAppStore } from '../../../store/index.js'

const appStore = useAppStore()
const forcedLogin = computed(() => appStore.forcedLogin)
const hasLogin = computed(() => appStore.hasLogin)
const userName = computed(() => appStore.userName)
const avatarUrl = computed(() => appStore.avatarUrl)
const gender = computed(() => appStore.gender)
const openId = computed(() => appStore.openId)

const { proxy } = getCurrentInstance()
const CustomBar = proxy.CustomBar || 50

const popularGroups = ref([])
const recommendedPeoples = ref([])
const recommendedGroups = ref([])
const nearbyGroups = ref([])
const background = ['color1', 'color2', 'color3']
const indicatorDots = ref(true)
const autoplay = ref(true)
const interval = ref(2000)
const duration = ref(500)
const items = ['ALL', 'GOING', 'SAVED', 'PAST']
const styles = ref([{
    value: 'button',
    text: '按钮',
    checked: true
  },
  {
    value: 'text',
    text: '文字'
  }
])
const colors = ['#007aff', '#4cd964', '#dd524d']
const current = ref(0)
const colorIndex = ref(0)
const activeColor = ref('#007aff')
const styleType = ref('button')

const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
}

const searchIcon = (e) => {
  uni.navigateTo({
    url: '/pages/search/search',
    animationType: 'pop-in',
    animationDuration: 200
  })
}

const getNearbyGroups = () => {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
        name: 'group-get-by-distance',
        data: {
          "longitude": 113,
          "latitude": 23,
          "radius": "100",
          "units": "km",
          "number": 100
        }
      })
      .then(res => {
        console.log('My nearby Groups: %s', JSON.stringify(res))
        resolve(res.result.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      });
  })
}

const getPopularGroups = () => {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
        name: 'groups-get-by-score',
        data: {
          maxNum: 20,
          minNum: 0
        }
      })
      .then(res => {
        console.log('My Groups: %s', JSON.stringify(res))
        resolve(res.result.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      });
  })
}

onLoad(() => {
  console.log('Page onLoad ' + openId.value);
  uni.showLoading({
    title: '加载中...'
  })
  let popularPromise = getPopularGroups().catch(e => e)
  let nearbyPromise = getNearbyGroups().catch(e => e)
  
  Promise.all([nearbyPromise, popularPromise])
    .then(value => {
      uni.hideLoading()
      console.log("Group data: %s", JSON.stringify(value))
      nearbyGroups.value = value[0]
      popularGroups.value = value[1]
    })
    .catch(err => {
      uni.hideLoading()
      console.log(err)
    })
})
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
