<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"></block>
		</cu-custom>

		<!-- login module, same from profile-->
		<view class="bg-img bg-mask flex align-center" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg');height: 414upx;">
			<view class="flex padding text-white" v-if="hasLogin">
				<view class="padding-lg margin-xs radius">
					<view class="cu-avatar round lg margin-left" :style="{backgroundImage:'url(' + avatarUrl + ')'}">
						<view class="cu-tag badge" :class="gender%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					</view>
				</view>

				<view class="padding-sm margin-xs radius text-lg">
					<text :value="userName">{{userName}}</text>
				</view>
			</view>
		</view>

		<form @submit="uploadImgAndCreatePost">
			<cu-upload-file v-on:addImage="addImage"></cu-upload-file>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="inputTextArea" placeholder="写些什么..."></textarea>
			</view>

			<view class="uni-row margin-top">
				<button class="uni-row" form-type="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'

	import cuUploadFile from '@/colorui/components/cu-upload-file.vue'

	export default {
		data() {
			return {
				textareaValue: '',
				groupId: '',
				groupName: '',
				imgList: []
			}
		},
		components: {
			cuUploadFile
		},
		computed: mapState(['hasLogin', 'userName', 'avatarUrl', 'gender', 'openId']),
		methods: {
			inputTextArea(e) {
				this.textareaValue = e.detail.value
				console.log("Entered Text: %s", this.textareaValue)
			},
			uploadImgAndCreatePost(e) {
				console.log('Start creating post for group %s', this.groupName)
				let imgUrls = []
				const data = {
					owner: {
						name: this.userName,
						openId: this.openId,
						gender: this.gender,
						avatarUrl: this.avatarUrl
					},
					groupId: this.groupId,
					content: this.textareaValue,
					imgUrls: imgUrls,
					likeCount:[]
				}
				console.log('Post data: %s', JSON.stringify(data))

				let successUploadCount = 0
				let failUploadCount = 0
				const totalCount = this.imgList.length
				if (this.imgList.length === 0) {
					this.createPost(data)
				} else {
					const self = this;
					this.imgList.forEach(img => {
						uniCloud.uploadFile({
							cloudPath: '/postPic/'+ Date.now() + '.png',
							filePath: img,
							onUploadProgress: function(progressEvent) {
								// console.log(progressEvent);
								var percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							},
							success(res) {
								console.log("successfully upload img " + res.fileID)
								imgUrls.push(res.fileID);
								successUploadCount += 1

								// after all images successfully uploaded, creat post
								
								if (successUploadCount === totalCount) {
									self.createPost(data)
								}
							},
							fail(err) {
								console.error(err)
								failUploadCount += 1
							},
							complete() {
								console.log("completed")
							}
						})
					})
				}
			},
			createPost(data) {
				console.log('Start to create post: %s', JSON.stringify(data))
				uniCloud.callFunction({
					name: 'post-create',
					data: data
				}).then(res => {
					console.log('Successfully create post: %s', JSON.stringify(res))
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					})
				}).catch(err => {
					console.error('Error occur while creating post: %s', JSON.stringify(err))
					uni.showToast({
						title: "创建错误",
						icon: "none"
					})
				})
			},
			addImage(e) {
				console.log('Add image: %s', e)
				this.imgList = e;
			}

		},
		onLoad(options) {
			console.log('Options: %s', JSON.stringify(options))
			this.groupId = options.groupId,
				this.groupName = options.groupName
		}
	}
</script>

<style>

</style>
