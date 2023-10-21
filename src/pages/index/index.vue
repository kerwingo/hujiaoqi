<!-- eslint-disable consistent-return -->
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable no-console -->
<!-- eslint-disable no-use-before-define -->
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { onShow, onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { speechApi } from '@/api'
import { sharePathFormat } from '@/common/wechat-share'
import { generateId } from '@/utils/common'

const plugin = requirePlugin('WechatSI')
const text = ref('支付宝到账100元')
const types = [
  {
    value: 1,
    name: '微信'
  },
  {
    value: 2,
    name: '支付宝'
  },
  {
    value: 3,
    name: '随机'
  }
]
const cate = [
  {
    value: 1,
    name: '固定'
  },
  {
    value: 2,
    name: '区间随机'
  }
]
const planList = ref<any>([])
const show = ref(false)
const option = reactive({
  name: '',
  moneyType: 1,
  money: 100, // 收款金额
  moneyStart: 1,
  moneyEnd: 1000,
  type: 2, // 收款类型
  intervalType: 1,
  interval: 2, // 播报间隔
  intervalStart: 2,
  intervalEnd: 600, // 十分钟
  indate: 3600 // 定时
})
const bgm = uni.getBackgroundAudioManager()
bgm.title = '语音助手'
// bgm.src =
//   'https://webfs.tx.kugou.com/202310211345/8b4a0c84707c99aa53b9abf1b54f7603/v2/c5738744a9925a3acb0f8da47f334c0c/KGTX/CLTX001/c5738744a9925a3acb0f8da47f334c0c.mp3'
bgm.onPlay(() => {
  console.log('开始播放')
  uni.hideLoading()
})
bgm.onPause(() => {
  console.log('暂停播放')
})
bgm.onError((err) => {
  console.log(err)
})
let callback: (() => void) | null = null
bgm.onEnded(() => {
  callback && callback()
})
const timer = () => {
  setTimeout(() => {
    playSpeech()
  }, option.interval * 1000)
}
function playSpeech() {
  let type = types.find((item) => item.value === option.type)
  if (type?.name === types[2].name) {
    type = types[Math.round(Math.random() * (types.length - 2))]
  }
  text.value = `${type?.name}到账${option.money}元`
  plugin.textToSpeech({
    lang: 'zh_CN',
    tts: true, // 启动文本转语音功能
    content: text.value, // 要播放的语音内容
    success: (res: { filename: string }) => {
      bgm.src = res.filename
      bgm.play()
    }
  })
}
function start() {
  uni.showLoading()
  playSpeech()
  bgm.play()
  callback = timer
}
function pause() {
  callback = null
  bgm.pause()
}
function radioGroupChange(e: any, type: any) {
  console.log(e, type)
}
function savePlan() {
  show.value = true
}
const model = ref()
function saveFn() {
  if (!option.name) {
    uni.showToast({
      icon: 'none',
      title: '请填写名称'
    })
    model.value.clearLoading()
    return false
  }
  const id = generateId()
  planList.value.push({
    id,
    data: option
  })
  uni.removeStorageSync('plan')
  uni.setStorageSync('plan', planList.value)
  show.value = false
  option.name = ''
}
function jump() {
  uni.switchTab({
    url: '/pages/mine/index'
  })
}
onShow(() => {
  planList.value = uni.getStorageSync('plan') || []
})
onShareAppMessage(() => {
  const sourceTime = new Date().getTime()
  return {
    title: '语音助手',
    path: sharePathFormat({ sourceTime })
  }
})
</script>
<template>
  <view class="container">
    <view class="tit">填写计划</view>
    <view class="plan">
      <view class="form">
        <u-form
          :model="option"
          ref="form"
          :label-style="{ fontWeight: 'bold' }"
          label-position="top"
          label-width="auto"
          label-align="left"
        >
          <u-form-item label="到账金额（元）" prop="name" input-align="right">
            <u-radio-group
              v-model="option.moneyType"
              @change="radioGroupChange($event, 'money')"
            >
              <u-radio
                shape="square"
                v-for="(item, index) in cate"
                :key="index"
                :name="item.value"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
            <view class="inpt" v-if="option.moneyType === 1">
              <u-input :border="true" type="number" v-model="option.money" />
            </view>
            <view class="inpt flex" v-else>
              <u-input
                :border="true"
                type="number"
                v-model="option.moneyStart"
                input-align="center"
              />
              <view class="con">至</view>
              <u-input
                :border="true"
                type="number"
                v-model="option.moneyEnd"
                input-align="center"
              />
            </view>
          </u-form-item>
          <u-form-item label="播报间隔时间（秒）" prop="intro">
            <u-radio-group
              v-model="option.intervalType"
              @change="radioGroupChange($event, 'interval')"
            >
              <u-radio
                shape="square"
                v-for="(item, index) in cate"
                :key="index"
                :name="item.value"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
            <view class="inpt" v-if="option.intervalType === 1">
              <u-input
                v-model="option.interval"
                placeholder="默认播放间隔2s"
                type="number"
                :border="true"
              />
            </view>
            <view class="inpt flex" v-else>
              <u-input
                :border="true"
                type="number"
                v-model="option.intervalStart"
              />
              <view class="con">至</view>
              <u-input
                :border="true"
                type="number"
                v-model="option.intervalEnd"
              />
            </view>
          </u-form-item>
          <u-form-item label="收款平台" prop="radio">
            <u-radio-group v-model="option.type">
              <u-radio
                v-for="(item, index) in types"
                :key="index"
                :name="item.value"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
        </u-form>
      </view>
      <view class="flex btns">
        <u-button type="success" size="medium" ripple @click="savePlan"
          >保存计划</u-button
        >
        <u-button type="success" size="medium" ripple @click="jump"
          >计划列表</u-button
        >
      </view>
      <u-modal
        v-model="show"
        :blur="1"
        :show-cancel-button="true"
        title="计划名称"
        @confirm="saveFn"
        :async-close="true"
        ref="model"
      >
        <view class="slot-content">
          <u-input :border="true" type="text" v-model="option.name" />
        </view>
      </u-modal>
    </view>
    <view class="flex btns_b">
      <u-button class="btn" type="primary" ripple @click="start">开始</u-button>
      <u-button class="btn" type="warning" ripple @click="pause">暂停</u-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '@/styles/helper.scss';

.container {
  font-style: normal;
  text-align: center;
  background-color: #f7f7f7;
  padding: 20rpx 30rpx 30rpx 30rpx;
  overflow: hidden;

  .tit {
    font-size: 30rpx;
    font-weight: bold;
    text-align: left;
    margin-bottom: 20rpx;
  }

  .plan {
    background-color: #fff;
    padding: 0 30rpx 30rpx 30rpx;
    border-radius: 12rpx;

    .form {
      margin-bottom: 40rpx;
      overflow: hidden;

      .inpt {
        margin-top: 40rpx;
      }

      .con {
        margin: 0 20rpx;
      }
    }

    .btns {
      justify-content: space-around;
    }
    .slot-content {
      padding: 30rpx;
    }
  }

  .btns_b {
    justify-content: center;
    margin-top: 50rpx;

    .btn {
      margin: 0 30rpx;
    }
  }
}
</style>
