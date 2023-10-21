<!-- eslint-disable no-param-reassign -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { Md5 } from 'ts-md5'
import { useUserStore } from '@/store'

const storeUser = useUserStore()
const { userInfo } = storeToRefs(storeUser)

watch(
  userInfo,
  (n) => {
    if (n) {
      if (!hasLogin.value) {
        // chatStore.jimInit()
      }
    }
  },
  {
    deep: true,
    immediate: false
  }
)

onLaunch(() => {
  console.log('App Launch')
})
onShow(async () => {
  console.log('App Show')
  storeUser.$patch((v) => {
    v.accessToken = uni.getStorageSync('accessToken') || ''
    v.userInfo = uni.getStorageSync('userInfo') || null
  })
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'vk-uview-ui/index.scss';
</style>
