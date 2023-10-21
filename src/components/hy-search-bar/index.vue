<template>
  <view class="rf-search-bar bg-primary">
    <view
      class="header"
      :style="{
        width: clientInfo.width + 'px',
        marginTop: clientInfo.inputTop + 'px'
      }"
    >
      <!-- 搜索框 -->
      <view class="input-box" @tap="toSearch">
        <input class="input" disabled />
        <view class="wrapper">
          <text class="iconfont hy-icon-search"></text>
          <text class="keyword">{{ placeholder }}</text>
        </view>
      </view>
      <!-- 扫一扫 -->
      <view class="icon-box">
        <text class="iconfont" @tap.stop="link" :class="[icon]"></text>
      </view>
    </view>
  </view>
  <view
    class="placeholder-box"
    :style="{
      height: clientInfo.height + 'px'
    }"
  ></view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { getQueryObject } from '@/utils/common'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { hasLogin } = storeToRefs(userStore)
const emit = defineEmits(['onSearch'])
const props = withDefaults(
  defineProps<{
    placeholder?: string
    icon?: string
    topDistance?: number
  }>(),
  {
    placeholder: '热门搜索',
    icon: 'hy-icon-scan',
    topDistance: 0
  }
)
const clientInfo = reactive({
  width: 0,
  height: 0,
  inputTop: 0
})
// #ifdef MP-WEIXIN
const obj = wx.getMenuButtonBoundingClientRect()
// #endif
// #ifdef H5
const obj = {
  top: 15,
  height: 40
}
// #endif
uni.getSystemInfo({
  success: (res) => {
    clientInfo.width = obj.left || res.windowWidth
    clientInfo.height = obj.top
      ? obj.top + obj.height + props.topDistance
      : res.statusBarHeight
    clientInfo.inputTop = obj.top
      ? obj.top + (obj.height - 30) / 2
      : res.statusBarHeight + 7
  }
})

// 扫一扫
const link = () => {
  if (!hasLogin) {
    uni.showModal({
      title: '提示',
      content: '登录后可使用扫码',
      showCancel: true,
      success: ({ confirm, cancel }) => {
        if (confirm) {
          uni.navigateTo({
            url: '/pages/login/index'
          })
        }
      }
    })
    return
  }
  // #ifdef H5
  jWeixin.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    success(res) {
      console.log(res)
      const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
    }
  })
  // #endif
  // #ifdef MP-WEIXIN
  uni.scanCode({
    success(res) {
      const { result } = res
      if (result) {
        const params = getQueryObject(result)
        const { redirect_url, shopId } = params
        if (redirect_url) {
          uni.navigateTo({
            url: `${redirect_url}?shopId=${shopId}`
          })
        }
      }
    },
    fail(_res) {}
  })
  // #endif
}
const toSearch = () => {
  emit('onSearch')
}
</script>

<style lang="scss" scoped>
.rf-search-bar {
  padding-bottom: 36rpx;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;

    .icon-box {
      margin: 0 $uni-spacing-row-sm 0 0;
      color: $uni-text-color-inverse;

      .iconfont {
        font-weight: 400;
        font-size: 50rpx;
      }

      .logo {
        width: 45rpx;
        height: 45rpx;
        border-radius: 8rpx;
        margin-left: 10rpx;
      }
    }

    .input-box {
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      background-color: $uni-bg-color-white;
      border-radius: 30rpx;
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 $uni-spacing-row-sm;

      .wrapper {
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: $uni-font-size-sm + 2rpx;
        color: $uni-text-color-light;
        transform: translate(-50%, -50%);

        .iconfont {
          font-size: 34rpx;
          margin-right: $uni-spacing-row-sm;
        }
      }

      .input {
        width: 100%;
        padding-left: 28rpx;
        height: 28rpx;
        color: #888;
        font-size: 28rpx;
      }
    }
  }
}

.bg {
  &-primary {
    background-color: $bg-primary;
  }
}

.placeholder-box {
  width: 100%;
  padding-bottom: 40rpx;
  box-sizing: content-box;
}
</style>
