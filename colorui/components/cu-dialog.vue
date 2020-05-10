<template>
	<!-- <view class="">
		<view class="cu-modal" :class="(modalDetail.modalName != null & showModal) ?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalDetail.modalContent}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalDetail.modalContent}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="doAction">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view> -->
	
	<view class="cu-modal bottom-modal" :class="show?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-green" @tap="doAction">确定</view>
				<view class="action text-blue" @tap="hideModal">取消</view>
			</view>
			<view class="padding-xl">
				{{modalDetail.modalContent}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
				return {
					show: true
				}
			},
			computed: {
				
			},
			props: {
				showModal: {
					type: Boolean,
					default: false
				},
				modalDetail: {
					type: Object,
					default: {
						"modalName":'',
						"modalTitle":'',
						"modalContent":''
					}
				},
				confirmAction: Function,
			},
			methods: {
				hideModal(e) {
					this.show = false
				},
				doAction() {
					console.log('do action' + this.confirmAction)
					this.confirmAction();
				}
			},
			onLoad: function() {
		
			}
	}
</script>

<style>
	
</style>
