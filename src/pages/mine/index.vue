<!-- eslint-disable no-param-reassign -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'

const planList = ref([])
function use(item: any) {
  uni.switchTab({
    url: `/pages/index/index?id=${item}`
  })
}
onShow(() => {
  planList.value = uni.getStorageSync('plan') || []
})
onLoad((option) => {})
</script>
<template>
  <div class="container">
    <view class="tit">计划列表</view>
    <view class="list" v-if="planList.length > 0">
      <view class="item" v-for="(item, index) in planList" :key="index">
        <!-- {{item}} -->
        <view>{{ item.data.name }}</view>
        <u-button size="mini" type="success" @click="use(item)">使用</u-button>
      </view>
    </view>
    <u-empty v-else text="暂无计划" mode="order" marginTop="100"></u-empty>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f7f7f7;
  position: relative;
  padding: 20rpx 30rpx 30rpx 30rpx;
  .tit {
    font-size: 30rpx;
    font-weight: bold;
    text-align: left;
    margin-bottom: 20rpx;
  }
  .list {
    background: #fff;
    border-radius: 12rpx;
    .item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
