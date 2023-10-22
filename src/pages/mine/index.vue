<!-- eslint-disable eqeqeq -->
<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-param-reassign -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
import { toast } from '@/utils/common'

const planList = ref([])
const options = [
  {
    text: '使用',
    style: {
      backgroundColor: '#007aff'
    }
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  }
]
function use(item: any) {
  uni.switchTab({
    url: `/pages/index/index?id=${item}`
  })
}
function click(index: string | number, index1: number) {
  if (index1 === 1) {
    planList.value.splice(index, 1)
    uni.removeStorageSync('plan')
    uni.setStorageSync('plan', planList.value)
    toast(`删除了第${index}个计划`)
  } else {
    planList.value[index].show = false
    toast('使用成功')
    use(planList.value[index])
  }
}
function open(index: string | number) {
  planList.value[index].show = true
  planList.value.map((val: any, idx: string | number) => {
    if (index != idx) planList.value[idx].show = false
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
      <view class="itemWrap" v-for="(item, index) in planList" :key="item.id">
        <u-swipe-action
          :show="item.show"
          :index="index"
          @click="click"
          @open="open"
          :options="options"
          bg-color="#f7f7f7"
        >
          <view class="item">
            <view>{{ item.data.name }}</view>
          </view>
        </u-swipe-action>
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
    // background: #fff;
    border-radius: 12rpx;
    .itemWrap {
      margin-bottom: 20rpx;
      background: #fff;
      border-radius: 12rpx;
      overflow: hidden;
      .item {
        background: #fff;
        padding: 20rpx;
      }
    }
  }
}
</style>
