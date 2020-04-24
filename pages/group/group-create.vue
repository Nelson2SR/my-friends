<template>
	<view class="uni-flex uni-row">
		<form @submit="createGroup" class="flex-item">
			<view class="group-metadata uni-flex uni-row">
				<view class="flex-item">
					<view>
						<progress :percent="percent" stroke-width="10"></progress>
					</view>
					<view>
						<button type="primary" :loading="loading" :disabled="disabled" @click="upload">选择照片</button>
					</view>
				</view>
				<view class="flex-item uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">Group Name</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input group-name" name="group-name" focus placeholder="" />
					</view>
				</view>
				<view class="flex-item uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">Group Description</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input group-description" name="group-description" focus placeholder="" />
					</view>
				</view>
			</view>
			
			<view class="group-visibility uni-flex uni-row">
				<view class="title">
					<text class="uni-form-item__title">Group visibility</text>
				</view>
				<view class="example-box">
					<uni-card :is-shadow="true" mode="style" @click="clickVisibilityCard('public')">
						<text class="content-box-text">Public Group</text>
						<text class="content-box-text">The group can be searched and its content can be seen by public.</text>
					</uni-card>
					<uni-card :is-shadow="true" mode="style" @click="clickVisibilityCard('closed')">
						<text class="content-box-text">Closed Group</text>
						<text class="content-box-text">The group can be searched but only members can view its content.</text>
					</uni-card>
					<uni-card :is-shadow="true" mode="style" @click="clickVisibilityCard('hidden')">
						<text class="content-box-text">Hidden Group</text>
						<text class="content-box-text">The group cannot be searched and its content can only be seen by members.</text>
					</uni-card>
				</view>
			</view>
			
			<view class="group-join-setting uni-flex uni-row">
				<view class="title">
					<text class="uni-form-item__title">Join Preference</text>
				</view>
				<view class="example-box">
					<uni-card :is-shadow="true" mode="style" @click="clickJoinCard('freeJoin')">
						<text class="content-box-text">Anyone can join</text>
						<text class="content-box-text">Anyone can join this group.</text>
					</uni-card>
					<uni-card :is-shadow="true" mode="style" @click="clickJoinCard('requireApproval')">
						<text class="content-box-text">Request to join</text>
						<text class="content-box-text">Joining the group requires admin approval.</text>
					</uni-card>
				</view>
			</view>
			
			<view class="uni-row">
				<button class="uni-row" form-type="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	var graceChecker = require("../../common/graceChecker.js");
	var _self;
	var tempFilePaths;
	var groupVisibility;
	var joinMethod;
	export default {
		components:{
			uniCard
		},
		data() {
			return {

			}
		},
		onLoad: function(options) {
			console.log(options.id);
		},
		methods: {
			createGroup: function(e) {

				//定义表单规则
				const rule = [{
						name: "group-name",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "姓名应为1-10个字符"
					},
					{
						name: "group-description",
						checkType: "string",
						checkRule: "1,50",
						errorMsg: "请控制为1-50个字符"
					}
				];

				/**
				 * FormData:
				 {
					 name:String,
					 description:String,
					 visibility:String,
					 joinMethod:String,
					 location:String,
					 pic:String,
					 type:String
				 }
				 */

				//进行表单检查
				const formData = e.detail.value;
				console.log('form data:' + JSON.stringify(formData))
				const checkRes = graceChecker.check(formData, rule);

				if (checkRes && groupVisibility !== undefined && joinMethod !== undefined ) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});

					let data = e.detail.value;
					data.createdAt = new Date();
					data.createdBy = 1;
					data.groupVisibility = groupVisibility;
					data.joinMethod = joinMethod;
					console.log('create group for data: ' + JSON.stringify(data));

					uniCloud.uploadFile({
						filePath: tempFilePaths[0],
						onUploadProgress: function(progressEvent) {
							// console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						},
						success(res) {
							console.log("successfully upload img " + res.fileID)
							data.imgId = res.fileID;

							uniCloud.callFunction({
									name: 'group-create',
									data: data
								})
								.then(res => {
									console.log("success with" + JSON.stringify(res));
									uni.navigateTo({
										url: 'group-view'
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
				groupVisibility = e;
				
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
			}
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
