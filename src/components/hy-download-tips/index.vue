<template>
  <div class="tips" v-show="show" animate="iteration-1 bounce">
    <div class="btn-close flex">
      <img
        src="https://image.blacksilverscore.com/uploads/4af4c1c2-ce7b-487d-8a8d-a0cd3e0aba08.png"
        alt="黑银"
        style="width: 10px; vertical-align: middle; margin-top: 0px"
        @click="close"
      />
    </div>
    <div class="logo flex">
      <img
        src="https://image.blacksilverscore.com/uploads/6647ab22-981c-40e1-80b2-d9e12bc11be9.png"
        alt="黑银"
        style="
          width: 30px;
          vertical-align: middle;
          margin-top: 0px;
          border-radius: 3px;
        "
      />
    </div>
    <div class="carousel">打开黑银APP，享排队免单</div>
    <u-button
      class="btn"
      type="primary"
      :ripple="true"
      :loading="loading"
      @click="openApp"
      >立即打开</u-button
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { launchClientApp } from '@/utils/common'

const props = withDefaults(
  defineProps<{
    top?: string | number
    bottom?: string | number
  }>(),
  {
    top: 'auto',
    bottom: 0
  }
)
const show = ref(true)
const loading = ref(false)
function close() {
  show.value = false
}
function openApp() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
  launchClientApp()
}
onPageScroll((e) => {
  const { scrollTop } = e
  if (scrollTop > 50) {
    show.value = false
  }
})
</script>

<style lang="scss" scoped>
.tips {
  position: fixed;
  width: 100%;
  top: v-bind('props.top');
  bottom: v-bind('props.bottom');
  left: 0;
  overflow: hidden;
  z-index: 20;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  align-items: center;
  height: 45px;
  .btn-close {
    width: 8%;
  }
  .logo {
    width: 10%;
    border-radius: 3px;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .carousel {
    width: 55%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #fff;
  }
  .btn {
    width: 25%;
    background-color: #218ccd;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
    height: 30px;
    &:before {
      flex-shrink: 0;
    }
  }
}

.placeholder-box {
  width: 100%;
  padding-bottom: 40rpx;
  box-sizing: content-box;
}
</style>
