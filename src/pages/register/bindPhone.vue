<!-- eslint-disable no-empty -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Md5 } from 'ts-md5'
import { baseApi, userApi } from '@/api'
import { isWeChat, generateId } from '@/utils/common'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const isWeChatOfficial = ref(true)
// #ifdef MP-WEIXIN
isWeChatOfficial.value = false
// #endif
const form = reactive({
  phone: '',
  sms_code: ''
})
const codeText = ref('')
const uCode = ref()
// 手机号验证
function mobileBlurFn() {
  const telReg = /^1[3456789]\d{9}$/
  if (form.phone !== '') {
    if (!telReg.test(form.phone)) {
      uni.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    }
  } else {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
  }
}
function clearFn() {
  form.phone = ''
}
function handleClick() {
  const { phone, sms_code } = form
  if (!phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }
  if (!sms_code) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    return
  }
  doRegister()
  // 2023/6/20 需求更改为使用随机密码，不再跳转去手动输入密码
  // uni.redirectTo({
  //   url: `/pages/register/index?phone=${phone}&code=${sms_code}`
  // })
}
async function sendSmsCode() {
  if (uCode.value.canGetCode) {
    try {
      const { data } = await baseApi.smsSend({
        type: 1,
        phone: form.phone
      })
      uCode.value.start()
    } catch {}
  }
}
function codeChange(text: string) {
  codeText.value = text
}
async function doRegister() {
  try {
    uni.showLoading({
      title: '提交中',
      mask: true
    })
    const params = {
      loginType: userApi.LOGIN_TYPE_ENUM.PWD,
      phone: form.phone,
      code: form.sms_code,
      password: Md5.hashStr(generateId()),
      openId: userStore.openid,
      unionId: userStore.unionid
    }
    const shopCode = uni.getStorageSync('shopCode')
    const shareCode = uni.getStorageSync('shareCode')
    if (shareCode) {
      params.inviteCode = shareCode
    } else if (shopCode) {
      params.shopCode = shopCode
    }
    const { data } = await userApi.register(params)
    userStore.syncSetToken(data.accessToken)
    await userStore.getUserInfo()
    // #ifdef MP-WEIXIN
    uni.navigateBack()
    // #endif
    // #ifdef H5
    uni.redirectTo({ url: '/pages/launch/index' })
    // #endif
    uni.hideLoading()
  } catch {}
}
onLoad((option) => {
  if (option?.phone) {
    form.phone = option.phone
  }
  // #ifdef H5
  isWeChatOfficial.value = isWeChat()
  // #endif
})
</script>
<template>
  <view class="container">
    <u-navbar
      back-text=""
      title="验证手机号"
      v-if="!isWeChatOfficial"
      :title-bold="true"
      color="#333"
    ></u-navbar>
    <view class="form">
      <view class="inputBox">
        <input
          class="inpt phone"
          type="number"
          v-model="form.phone"
          maxlength="11"
          @blur="mobileBlurFn"
          placeholder-class="placeholderStyle"
          placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
          placeholder="请输入手机号"
        />
        <cover-image
          v-if="form.phone"
          @tap="clearFn"
          class="close"
          src="https://naoyuekang-weixindev.oss-cn-chengdu.aliyuncs.com/mine/close.png"
        ></cover-image>
      </view>
      <view class="inputBox flex">
        <!--                <view class="label">验证码</view>-->
        <input
          class="inpt code"
          type="text"
          maxlength="6"
          v-model="form.sms_code"
          placeholder-class="placeholderStyle"
          placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
          placeholder="请输入验证码"
        />
        <u-button size="mini" type="success" @click="sendSmsCode">
          {{ codeText }}</u-button
        >
        <u-verification-code
          ref="uCode"
          @change="codeChange"
        ></u-verification-code>
      </view>
      <u-button
        type="primary"
        class="hy-btn"
        :ripple="true"
        @click="handleClick"
        >下一步</u-button
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background: #fff;
  overflow: hidden;
  min-height: 100vh;
}

.placeholderStyle {
  color: #d3dbe0;
  font-size: 34rpx;
  font-weight: normal;
}

.logo {
  display: block;
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto;
  margin-top: 100rpx;
  border-radius: 10rpx;
}

.form {
  padding: 200rpx 75rpx;
}

.inputBox {
  position: relative;
  border-bottom: 2rpx solid #e6ecf0;
  margin-bottom: 20rpx;
  &.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .label {
    font-size: 36rpx;
    color: #333;
    font-weight: bold;
  }

  .inpt {
    display: block;
    width: 500rpx;
    padding: 30rpx 0;
    color: #242426;
    font-weight: bold;
    font-size: 34rpx;
  }

  .close {
    width: 28rpx;
    height: 28rpx;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    z-index: 2;
  }
}

.hy-btn {
  margin: 70rpx 0 30rpx 0;

  &.wx {
    margin-top: 40rpx;
  }

  .hy-icon-wechat {
    color: #fff;
    margin-right: 15rpx;
    font-size: 36rpx;
  }
}
</style>
