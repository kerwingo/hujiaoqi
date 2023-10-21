<!-- eslint-disable no-console -->
<!-- eslint-disable no-empty -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { Md5 } from 'ts-md5'
import { useUserStore } from '@/store'
import { baseApi, userApi } from '@/api'
import logo from '@/static/ic_launcher.png'
import { isWeChat, getQueryVariable } from '@/utils/common'

const userStore = useUserStore()
const isWeChatOfficial = ref(true)
// #ifdef MP-WEIXIN
isWeChatOfficial.value = false
// #endif
const form = reactive({
  username: '',
  code: '',
  type: 10
})
const codeText = ref('')
const uCode = ref()
// 手机号验证
const telReg = /^1[3456789]\d{9}$/
function mobileBlurFn() {
  if (form.username !== '') {
    if (!telReg.test(form.username)) {
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
  form.username = ''
}

function switchLoginType(type: string) {
  form.type = userApi.LOGIN_TYPE_ENUM[type]
  form.code = ''
}
async function submit() {
  if (form.username !== '') {
    if (!telReg.test(form.username)) {
      uni.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
  } else {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }
  if (!form.code) {
    uni.showToast({
      title:
        form.type === userApi.LOGIN_TYPE_ENUM.PWD
          ? '请输入密码'
          : '请输入验证码',
      icon: 'none'
    })
    return
  }
  try {
    const { data } = await userApi.login({
      type: form.type,
      username: form.username,
      code:
        form.type === userApi.LOGIN_TYPE_ENUM.PWD
          ? Md5.hashStr(form.code)
          : form.code
    })
    userStore.syncSetToken(data.accessToken)
    await getUserInfo()
    uni.navigateBack()
    if (!isWeChatOfficial.value) return
    if (!uni.getStorageSync('openid')) {
      await userStore.wxAuth()
      uni.setStorageSync('onlyGetOpenid', 'yes')
    }
  } catch {}
}
async function getUserInfo() {
  const { data } = await userApi.userInfo()
  userStore.syncSetUserInfo(data)
}
function getUserProfileFn() {
  uni.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    lang: 'zh_CN',
    success: (res) => {
      console.log(res)
    }
  })
}
async function getPhoneNumber(res: { detail: { code: any } }) {
  try {
    const { data } = await userApi.wxUserPhoneNumber({
      accessToken: userStore.wxAccessToken,
      code: res.detail.code
    })
    uni.redirectTo({
      url: `/pages/register/bindPhone?phone=${data.phoneNumber}`
    })
  } catch (err) {
    console.log('getNumber', err)
  }
}
async function handleWxWebLogin() {
  await userStore.wxAuth()
}
function toRegister() {
  uni.navigateTo({
    url: '/pages/register/bindPhone'
  })
}
async function sendSmsCode() {
  if (form.username !== '') {
    if (!telReg.test(form.username)) {
      uni.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
  } else {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }
  if (uCode.value.canGetCode) {
    try {
      const { data } = await baseApi.smsSend({
        type: 2,
        phone: form.username
      })
      uCode.value.start()
    } catch {}
  }
}
function codeChange(text: string) {
  codeText.value = text
}

onLoad(async (option) => {
  // #ifdef H5
  isWeChatOfficial.value = isWeChat()
  if (isWeChatOfficial.value) {
    const code = getQueryVariable('code')
    if (code) {
      console.log('重定向的login', code)
      await userStore.wxWebLogin(code)
      if (uni.getStorageSync('onlyGetOpenid')) {
        uni.removeStorageSync('onlyGetOpenid')
        return
      }
      const login_success = await userStore.loginByOpenId()
      if (login_success) {
        uni.redirectTo({
          url: '/pages/launch/index?from=login'
        })
      } else {
        uni.redirectTo({
          url: '/pages/register/bindPhone'
        })
      }
    } else {
      console.log('首次进入login', code)
    }
  }
  // #endif
})
</script>
<template>
  <view class="container">
    <u-navbar
      back-text=""
      title="登录"
      v-if="!isWeChatOfficial"
      :title-bold="true"
      color="#333"
    ></u-navbar>
    <image class="logo" :src="logo" mode="widthFix" />
    <view class="form">
      <!-- #ifdef H5 -->
      <view v-if="!isWeChatOfficial">
        <view class="inputBox">
          <input
            class="inpt phone"
            type="number"
            v-model="form.username"
            maxlength="11"
            @blur="mobileBlurFn"
            placeholder-class="placeholderStyle"
            placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
            placeholder="请输入手机号"
          />
          <cover-image
            v-if="form.username"
            @tap="clearFn"
            class="close"
            src="https://naoyuekang-weixindev.oss-cn-chengdu.aliyuncs.com/mine/close.png"
          ></cover-image>
        </view>
        <view class="inputBox" v-if="form.type === userApi.LOGIN_TYPE_ENUM.PWD">
          <input
            class="inpt code"
            type="text"
            maxlength="20"
            v-model="form.code"
            placeholder-class="placeholderStyle"
            placeholder-style="color: #D3DBE0;font-size: 34rpx;font-weight: normal;"
            placeholder="请输入密码"
          />
        </view>
        <view class="inputBox flex" v-else>
          <input
            class="inpt code"
            type="text"
            maxlength="6"
            v-model="form.code"
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
        <u-button type="primary" class="hy-btn" :ripple="true" @click="submit"
          >登录</u-button
        >
        <view class="loginType">
          <text
            @click="switchLoginType('SMS_CODE')"
            v-if="form.type === userApi.LOGIN_TYPE_ENUM.PWD"
            >验证码登录
          </text>
          <text v-else @click="switchLoginType('PWD')">密码登录 </text>
        </view>
        <!-- #ifdef H5 -->
        <view v-if="!isWeChatOfficial" class="signuptips" @click="toRegister"
          >还没有账号？ <text> 点我立即注册</text></view
        >
        <!-- #endif -->
      </view>
      <!-- #endif -->

      <view>
        <!-- #ifdef MP-WEIXIN -->
        <u-button
          type="primary"
          class="hy-btn wx"
          open-type="getPhoneNumber"
          ripple
          @getphonenumber="getPhoneNumber"
        >
          <!-- <text class="iconfont hy-icon-wechat"></text> -->
          手机号快捷登录
        </u-button>
        <navigator
          open-type="navigateBack"
          hover-class="navigator-hover"
          style="text-align: center; color: #999"
        >
          取消
        </navigator>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <u-button
          type="primary"
          class="hy-btn wx"
          open-type="getPhoneNumber"
          ripple
          @click="handleWxWebLogin"
          v-if="isWeChatOfficial"
        >
          <text class="iconfont hy-icon-wechat"></text>
          微信快捷登录
        </u-button>
        <!-- #endif -->
      </view>
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

.loginType {
  color: #a1a1a1;
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

.signuptips {
  font-size: 24rpx;
  margin-top: 50rpx;
  color: #a1a1a1;
  text-align: center;

  text {
    color: #2979ff;
  }
}
</style>
