<template>
  <hy-nav-bar
    :background="{
      backgroundColor: 'transparent'
    }"
    :immersive="true"
    :border-bottom="false"
    :back-icon-color="'#fff'"
  ></hy-nav-bar>
  <!-- #ifndef H5 -->
  <web-view v-if="url" :src="url"></web-view>
  <!-- #endif -->
  <!-- #ifdef H5 -->
  <iframe class="iframe" :src="url" ref="iframe" frameborder="0"></iframe>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const url = ref()
const iframe = ref<any>(null)

onLoad((option) => {
  url.value = option?.url
})
onMounted(() => {
  const data = {
    ...userStore.userInfo,
    token: {
      accessToken: userStore.accessToken
    }
  }
  iframe.value.onload = () => {
    const iframeWindow = iframe.value.contentWindow
    iframeWindow.postMessage({ userInfo: JSON.stringify(data) }, '*')
  }
})
</script>

<style scoped lang="scss">
.iframe {
  width: 100%;
  display: block;
  height: 100%;
}
</style>
