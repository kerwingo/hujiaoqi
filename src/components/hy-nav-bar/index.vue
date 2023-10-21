<!--
 * @Description: Description
 * @Author: Kerwin
 * @Date: 2023-06-07 15:41:52
 * @LastEditTime: 2023-07-25 14:52:36
 * @LastEditors:  Please set LastEditors
-->
<template>
  <view v-if="show && !isWeChat()" class="navBar">
    <u-navbar
      :is-back="isBack"
      :title="title"
      :background="background"
      :immersive="immersive"
      :border-bottom="borderBottom"
      :back-icon-color="backIconColor"
      :back-icon-name="backIconName"
    >
      <view class="slot-wrap"></view>
    </u-navbar>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { isWeChat } from '@/utils/common'

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
    show?: boolean
  }>(),
  {
    isBack: true,
    title: '',
    isFixed: true,
    titleBold: false,
    immersive: false,
    borderBottom: true,
    backIconName: 'nav-back',
    show: true,
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
</script>

<style lang="scss" scoped>
.slot-wrap {
  display: flex;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /* flex: 1; */
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}
</style>
