<template>
	<view class="uni-flex uni-row">
		<view class="flex-item group-header">
			<image src="../../static/logo.png" mode=""></image>
			<text class="info">创建新群组</text>
			<text class="description">找到兴趣小伙伴</text>
		</view>
		
		<form @submit="createGroup" class="flex-item">
			<view class="uni-form-item uni-column">
				<view class="title">构想群组的名字，描述理想中的伙伴和活动内容</view>
				<input class="uni-input" name="group-name" placeholder="群名" />
				<input class="uni-input" name="group-description" placeholder="内容介绍" />
			</view>
			<button form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	var  graceChecker = require("../../common/graceChecker.js");
	
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function (options) {
			console.log(options.id);
		},
		methods: {
			createGroup: function (e) {
				
				//定义表单规则
				const rule = [
				    {name:"group-name", checkType : "string", checkRule:"1,10",  errorMsg:"姓名应为1-10个字符"},
				    {name:"group-description", checkType : "string", checkRule:"1,50",  errorMsg:"请控制为1-50个字符"}
				];
				
				//进行表单检查
				const formData = e.detail.value;
				const checkRes = graceChecker.check(formData, rule);
				
				if(checkRes){
				    uni.showToast({title:"验证通过!", icon:"none"});
					let data = e.detail.value;
					data.createdAt = new Date();
					data.createdBy = 1;
					
					console.log('create group for data: ' + JSON.stringify(data));
				
					uniCloud.callFunction({
						name: 'group-create',
						data: data
					})
					.then(res => {
						console.log("success with" + JSON.stringify(res));
						uni.navigateTo({
						    url: 'group-view?id=1&name=uniapp'
						});
					});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
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
</style>
