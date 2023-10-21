<!--
 * @Description: Description
 * @Author: Kerwin
 * @Date: 2023-07-01 16:22:48
 * @LastEditTime: 2023-07-01 17:12:33
 * @LastEditors:  Please set LastEditors
-->
<template>
  <view v-if="show" class="navBar">
    <view
      class="backIcon"
      :style="{ background: backIconBg, marginTop: mTop + 'px' }"
      @click="goback"
    >
      <u-icon :name="backIconName" :color="backIconColor" size="30"></u-icon
    ></view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const mTop = ref(0)
let btnObj = {}
// #ifdef H5
btnObj = {
  top: 10,
  height: 40
}
// #endif
// #ifdef MP-WEIXIN
btnObj = wx.getMenuButtonBoundingClientRect()
// #endif
uni.getSystemInfo({
  success: (res) => {
    mTop.value = btnObj.top
      ? btnObj.top + (btnObj.height - 30) / 2
      : res.statusBarHeight + 7
  }
})
const props = withDefaults(
  defineProps<{
    isBack?: boolean
    title?: string
    isFixed?: boolean
    titleBold?: boolean
    background?: object
    immersive?: boolean
    borderBottom?: boolean
    backIconColor?: string
    backIconName?: string
    backIconBg?: string
  }>(),
  {
    isBack: true,
    title: '',
    isFixed: true,
    titleBold: false,
    immersive: false,
    borderBottom: true,
    backIconName: 'arrow-left',
    backIconBg: 'rgba(0,0,0,0.1)',
    backIconColor: '#fff',
    background: () => {
      return {
        backgroundColor: '#fafafa'
        // 导航栏背景图
        // background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat'
        // 还可以设置背景图size属性
        // backgroundSize: 'cover',
        // 渐变色
        // backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      }
    }
  }
)
const show = ref(true)
function goback() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.switchTab({ url: '/pages/community/index' })
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.backIcon {
  width: 54rpx;
  height: 54rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: 20rpx;
}
.slot-wrap {
  display: flex;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /* flex: 1; */
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}
</style>
