<template>
	<view>
		<view>
			<progress :percent="percent" stroke-width="10"></progress>
		</view>
		<view>
			<button type="primary" :loading="loading" :disabled="disabled" @click="upload">选择照片</button>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data: {
			percent: 0,
			loading: false,
			disabled: false
		},
		methods: {
			upload: function() {
				_self = this;
				uni.chooseImage({
					count: 1,
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						uniCloud.uploadFile({
							filePath: tempFilePaths[0],
							onUploadProgress: function(progressEvent) {
								// console.log(progressEvent);
								var percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							},
							success() {},
							fail() {},
							complete() {}
						});
						// const uploadTask = uniCloud.uploadFile({
						// 	filePath: tempFilePaths[0],
						// 	onUploadProgress: function(progressEvent) {
						// 		console.log(progressEvent);
						// 		var percentCompleted = Math.round(
						// 			(progressEvent.loaded * 100) / progressEvent.total
						// 		);
						// 	},
						// 	success() {},
						// 	fail() {},
						// 	complete() {}
						// });

						// console.log("result for upload:" + uploadTask);

						// uploadTask.onProgressUpdate(function(res) {
						// 	_self.percent = res.progress;
						// 	console.log('上传进度' + res.progress);
						// 	console.log('已经上传的数据长度' + res.totalBytesSent);
						// 	console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						// });
					}
				});
			}
		},
		onLoad: function() {

		}
	}
</script>

<style>

</style>
