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
			<view class="cu-form-group margin-top">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			
			<view class="cu-bar bg-white">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
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
					<radio :class="joinMethod=='requireApproval'?'checked':''" :checked="joinMethod=='requireApproval'?true:false" value="requireApproval"></radio>
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
	
	export default {
		components: {
			
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
				imgList: [],
				region: ['广东省', '广州市', '海珠区'],
				joinMethod: "",
				visibility: "",
				description: "",
				showDialog: false
			}
		},
		computed: mapState(['openId', 'gender', 'avatarUrl']),
		
		onLoad: function(options) {
			console.log("landed on create-group page")
			console.log("OpenId: %s", this.openId)
		},
		methods: {
			createGroup: function(e) {

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
					data.type = '游戏';
					data.region = this.region;
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

					uniCloud.uploadFile({
						filePath: this.imgList[0],
						onUploadProgress: function(progressEvent) {
							// console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						},
						success(res) {
							console.log("successfully upload img " + res.fileID)
							data.imgUrl = res.fileID;

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

						},
						fail(err) {
							console.error(err)
						},
						complete() {
							console.log("completed")
						}
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
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
