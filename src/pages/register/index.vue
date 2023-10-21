<!-- eslint-disable no-empty -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Md5 } from 'ts-md5'
import { useUserStore } from '@/store'
import { userApi } from '@/api'
import { isWeChat } from '@/utils/common'

const userStore = useUserStore()
const isWeChatOfficial = ref(true)
// #ifdef MP-WEIXIN
isWeChatOfficial.value = false
// #endif
const form = reactive({
  password: '',
  passwordr: '',
  code: '',
  phone: ''
})
const disabled = computed(() => {
  const { password, passwordr } = form
  return !(
    password &&
    passwordr &&
    password.length >= 6 &&
    passwordr.length >= 6
  )
})
// 验证
function blurFn() {
  const telReg = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,18}$/
  if (form.password !== '') {
    if (!telReg.test(form.password)) {
      uni.showToast({
        title: '密码不正确，密码由6-18位数字、英文或特殊字符组成!',
        icon: 'none'
      })
    }
  } else {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    })
  }
}
function clearFn() {
  form.password = ''
}
async function submit() {
  const { password, passwordr } = form
  if (password !== passwordr) {
    uni.showToast({
      title: '密码不一致',
      icon: 'none'
    })
    return
  }
  try {
    uni.showLoading({
      title: '提交中',
      mask: true
    })
    const params = {
      loginType: userApi.LOGIN_TYPE_ENUM.PWD,
      phone: form.phone,
      code: form.code,
      password: Md5.hashStr(form.password),
      openId: userStore.openid,
      unionId: userStore.unionid
    }
    const shopCode = uni.getStorageSync('shopCode')
    const shareCode = uni.getStorageSync('shareCode')
    const shopOwnerShareCode = uni.getStorageSync('shopOwnerShareCode')
    if (shareCode) {
      params.inviteCode = shareCode
    } else if (shopOwnerShareCode) {
      params.inviteCode = shopOwnerShareCode
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
    form.code = option.code
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
      title="设置密码"
      v-if="!isWeChatOfficial"
      :title-bold="true"
      color="#333"
    ></u-navbar>
    <view class="form">
      <view class="inputBox">
        <!--                <view class="label">手机号</view>-->
        <input
          class="inpt phone"
          type="text"
          v-model="form.password"
          maxlength="18"
          minlength="6"
          @blur="blurFn"
          placeholder-class="placeholderStyle"
          placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
          placeholder="请输入6~18位密码"
        />
        <cover-image
          v-if="form.password"
          @tap="clearFn"
          class="close"
          src="https://naoyuekang-weixindev.oss-cn-chengdu.aliyuncs.com/mine/close.png"
        ></cover-image>
      </view>
      <view class="inputBox">
        <input
          class="inpt code"
          type="text"
          maxlength="20"
          v-model="form.passwordr"
          placeholder-class="placeholderStyle"
          placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
          placeholder="再次确认登录密码"
        />
      </view>
      <u-button
        type="primary"
        class="hy-btn"
        :disabled="disabled"
        :ripple="true"
        @click="submit"
        >立即登录</u-button
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
