<!-- eslint-disable no-console -->
<!-- eslint-disable no-param-reassign -->
<!-- eslint-disable no-empty -->
<!-- eslint-disable no-use-before-define -->
<!--
h5分享的链接统一通过此页面重定向
分享链接或生成二维码的链接有（示例）：
1.付款链接
https://wap.blacksilverscore.com/?redirect_url=/pages/physicalShopCheck/index&qrcode=1&shopId=1221
2.店铺分享链接
https://wap.blacksilverscore.com/?redirect_url=/pages/physicalShop/index&qrcode=1&shopId=1073
3.商品分享链接
https://wap.blacksilverscore.com/?redirect_url=/pages/productDetail/index&qrcode=1&shopId=1073&productId=100003057&shareCode='84DUO4'
 -->

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import logo from '@/static/ic_launcher.png'
import { useUserStore, useConfigStore } from '@/store'
import {
  getQueryObject,
  getQueryVariable,
  isWeChat,
  parseParams
} from '@/utils/common'
import { baseApi } from '@/api'

const userStore = useUserStore()
const configStore = useConfigStore()
function toTargetPage(URL?: any, duration = 0) {
  const url = URL || '/pages/index/index'
  console.log('启动页跳转至：', url)
  setTimeout(() => {
    uni.reLaunch({
      url
    })
  }, duration)
}

onLoad(async (option) => {
  toTargetPage()
})
</script>

<template>
  <div class="launch">
    <view class="content" style="--num: 150">
      <image class="logo" :src="logo" mode="widthFix" />
      <text class="name">黑银生活</text>
      <view class="dot"></view>
    </view>
    <view class="footer">
      <view class="text">Copyright © 黑银生活版权所有</view>
    </view>
  </div>
</template>
<style scoped lang="scss">
.launch {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 420rpx;
    height: 420rpx;
    border-radius: 50%;
    border: 1px solid $bg-primary;
    animation: fadeIn 2s linear forwards;

    .logo {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      margin-top: 20rpx;
    }

    .name {
      font-size: 32rpx;
      margin-top: 20rpx;
      font-weight: bold;
    }

    .dot {
      position: absolute;
      inset: 0rpx;
      z-index: 10;
      animation: animateDot 3s linear forwards;

      &::before {
        content: '';
        position: absolute;
        top: -7px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 14px;
        background: #00a6bc;
        border-radius: 50%;
      }
    }
  }

  .footer {
    width: 100%;
    position: absolute;
    margin: auto;
    bottom: calc(50rpx + env(safe-area-inset-bottom));

    .text {
      margin-top: 20rpx;
      text-align: center;
      color: #9f9f9f;
      font-size: 22rpx;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes animateDot {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(calc(3.6deg * var(--num)));
    /* 360 / 100 = 3.6deg */
  }
}
</style>
