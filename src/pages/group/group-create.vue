<template>
	<view class="uni-flex uni-row">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新群</block>
		</cu-custom>
		<form @submit="createGroup" class="">
			<view class="cu-form-group">
				<input placeholder="群名" name="name"></input>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="onDescriptionInput" placeholder="群描述" name="description"></textarea>
			</view>
			<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
			<!-- <view class="cu-form-group margin-top">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view> -->
			<!-- #endif -->

			<view class="page-section page-section-gap" v-if="hasLocation">
				<map style="width: 100%; height: 300px;" :latitude="location.latitude" :longitude="location.longitude" :covers="covers">
				</map>
			</view>
			<button open-type="getUserInfo" v-on:click="chooseLocation" v-else>选择地址</button>

			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">类别选择</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->

			<cu-upload-file v-on:addImage="addImage" :text="groupPicText" :type="groupPicType"></cu-upload-file>
			<cu-upload-file v-on:addQRCode="addQRCode" :text="qrCodeText" :type="qrCodeType"></cu-upload-file>

			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 群隐私
				</view>
			</view>
			<radio-group class="block" @change="onVisibilityChange">
				<view class="cu-form-group">
					<view class="title">Public</view>
					<radio :class="visibility=='public'?'checked':''" :checked="visibility=='public'?true:false" value="public"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">Closed</view>
					<radio :class="visibility=='closed'?'checked':''" :checked="visibility=='closed'?true:false" value="closed"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">Hidden</view>
					<radio :class="visibility=='hidden'?'checked':''" :checked="visibility=='hidden'?true:false" value="hidden"></radio>
				</view>
			</radio-group>

			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 加入方式
				</view>
			</view>
			<radio-group class="block" @change="onJoinMethodChange">
				<view class="cu-form-group">
					<view class="title">Free Join</view>
					<radio :class="joinMethod=='freeJoin'?'checked':''" :checked="joinMethod=='freeJoin'?true:false" value="freeJoin"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">Require Approval</view>
					<radio :class="joinMethod=='requireApproval'?'checked':''" :checked="joinMethod=='requireApproval'?true:false"
					 value="requireApproval"></radio>
				</view>
			</radio-group>

			<view class="uni-row margin-top">
				<button class="uni-row" form-type="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../common/graceChecker.js");
	var _self;
	var tempFilePaths;

	import {
		mapState
	} from 'vuex'

	import cuUploadFile from '@/colorui/components/cu-upload-file.vue'

	export default {
		components: {
			cuUploadFile
		},
		props: {
			showForm: {
				type: Boolean,
				default: true
			},
			showLoading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				"pickPic": "选择照片",
				"groupPicText": "群封面",
				"qrCodeText": "QR Code",
				"groupPicType": "groupPic",
				"qrCodeType": "qrCodePic",
				imgList: [],
				qrCodeList: [],
				region: ['广东省', '广州市', '海珠区'],
				joinMethod: "",
				visibility: "",
				description: "",
				showDialog: false,
				groupTopicsMap: {},
				multiArray: [

				],
				multiIndex: [0, 0],
				hasLocation: false,
				location: {},
				covers: [],
				cover: {}
			}
		},
		computed: mapState(['openId', 'gender', 'avatarUrl']),

		onLoad: function(options) {
			console.log("landed on create-group page")
			console.log("OpenId: %s", this.openId)
			uniCloud.callFunction({
				name: 'grouptopic-get',
				data: {}
			}).then(res => {
				console.log("Successfully retrieved group topics: %s", JSON.stringify(res))
				const groupTopicsData = res.result.data
				const groupTopicsMap = {}
				const groupTopicNames = []
				groupTopicsData.forEach(groupTopic => {
					groupTopicNames.push(groupTopic.name)
					const groupTypeNames = []
					groupTopic.groupTypes.forEach(groupType => {
						groupTypeNames.push(groupType.name)
					})

					groupTopicsMap[groupTopic.name] = groupTypeNames
				})
				console.log("groupTopics name map: %s", JSON.stringify(groupTopicsMap))
				this.groupTopicsMap = groupTopicsMap
				this.multiArray.push(groupTopicNames)
				this.multiArray.push(groupTopicsMap[groupTopicNames[0]])
			}).catch(err => {
				console.log("Error occurs while retrieving group topics: %s", JSON.stringify(err))
			})
		},
		methods: {
			createGroup: async function(e) {

				//定义表单规则
				const rule = [{
						name: "name",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "姓名应为1-10个字符"
					},
					{
						name: "description",
						checkType: "string",
						checkRule: "1,50",
						errorMsg: "请控制为1-50个字符"
					}
				];

				//进行表单检查
				const formData = e.detail.value;
				console.log('form data:' + JSON.stringify(formData))
				const checkRes = graceChecker.check(formData, rule);

				if (checkRes && this.visibility !== undefined && this.joinMethod !== undefined) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					this.showForm = false;
					this.showLoading = true;

					let data = e.detail.value;
					data.createdAt = new Date();
					data.createdBy = 1;
					data.visibility = this.visibility;
					data.joinMethod = this.joinMethod;
					data.type = {
						name: this.multiArray[1][this.multiIndex[1]],
						groupTopic: this.multiArray[0][this.multiIndex[1]]
					};
					if (this.location.length != 0) {
						data.location = {
							'longitude': this.location.longitude,
							'latitude': this.location.latitude,
							'name': this.location.name,
							'address': this.address
						};
					}

					data.read = 0;
					data.vote = 0;
					data.comment = 0;
					const owner = {
						openId: this.openId,
						gender: this.gender,
						avatarUrl: this.avatarUrl
					}
					data.owner = owner;
					data.members = [owner];
					data.admins = [owner];
					console.log('create group for data: ' + JSON.stringify(data));

					let imgUploadResult = await uniCloud.uploadFile({
						filePath: this.imgList[0],
						cloudPath: '/groupPic/' + Date.now() + '.png',
						onUploadProgress: function(progressEvent) {
							// console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						}
					});


					let qrCodeUploadResult = await uniCloud.uploadFile({
						filePath: this.qrCodeList[0],
						cloudPath: '/groupPic/' + Date.now() + '.png',
						onUploadProgress: function(progressEvent) {
							// console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						}
					})

					data.imgUrl = imgUploadResult.fileID;
					data.qrCodeUrl = qrCodeUploadResult.fileID;

					uniCloud.callFunction({
							name: 'group-create',
							data: data
						})
						.then(res => {
							console.log("success with" + JSON.stringify(res));
							uni.redirectTo({
								url: 'group-view?id=' + res.result.id
							});
						});

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			upload: function() {
				_self = this;
				uni.chooseImage({
					count: 1,
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						tempFilePaths = res.tempFilePaths;
						console.log("Have chose image in path:" + tempFilePaths)
					}
				});
			},

			// uploadFile (filePath, cloudPath) {
			// 		return await uniCloud.uploadFile({
			// 				filePath: filePath,
			// 				cloudPath: cloudPath,
			// 				onUploadProgress: function(progressEvent) {
			// 					// console.log(progressEvent);
			// 					var percentCompleted = Math.round(
			// 						(progressEvent.loaded * 100) / progressEvent.total
			// 					);
			// 				}
			// 			});
			// 		}
			// },
			clickVisibilityCard(e) {
				visibility = e;

				uni.showToast({
					title: '点击卡片',
					icon: 'none'
				})
			},
			clickJoinCard(e) {
				joinMethod = e;

				uni.showToast({
					title: '点击卡片',
					icon: 'none'
				})
			},
			addImage(e) {
				console.log('Add image: %s', e)
				this.imgList = e;
			},
			addQRCode(e) {
				console.log('Add QR Code: %s', e)
				this.qrCodeList = e;
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			onVisibilityChange(e) {
				this.visibility = e.detail.value
			},
			onJoinMethodChange(e) {
				this.joinMethod = e.detail.value
			},
			onDescriptionInput(e) {
				this.description = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				console.log("current picker data: %s - %s", JSON.stringify(data), JSON.stringify(e))
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						let groupTopicName = this.multiArray[0][e.detail.value]
						let groupTypes = this.groupTopicsMap[groupTopicName]
						data.multiArray.pop()
						data.multiArray.push(groupTypes)
						data.multiIndex[1] = 0;
						break;
					case 1:
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			chooseLocation() {
				console.log('start to choose location')
				let self = this
				uni.chooseLocation({
					success: (res) => {
						console.log('location response: %s', JSON.stringify(res))
						self.hasLocation = true,
							self.location['longitude'] = res.longitude,
							self.location['latitude'] = res.latitude,
							self.location['name'] = res.name,
							self.location['address'] = res.address,
							self.cover['longitude'] = res.longitude,
							self.cover['latitude'] = res.latitude,
							self.cover['iconPath'] = '../../static/location.png'
						self.covers.push(self.cover)
					},
					fail: (err) => {
						console.log('error: %s', JSON.stringify(err))
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								uni.getLocation({
									type: 'wgs84',
									success: function(res) {
										console.log('location response: %s', JSON.stringify(res))
										console.log('当前位置的经度：' + res.longitude);
										console.log('当前位置的纬度：' + res.latitude);
									}
								})
							}
						})
					}
				})
				console.log('the location: %s', JSON.stringify(this.location))
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

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

	.uni-form-item__title {
		font-size: 16px;
		line-height: 24px;
	}

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
