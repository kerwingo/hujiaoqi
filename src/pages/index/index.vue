<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  onReady,
  onShow,
  onLoad,
  onReachBottom,
  onPageScroll,
  onShareAppMessage
} from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { baseApi } from '@/api'
import { getImgFullPath } from '@/utils'
import { useUserStore } from '@/store'
import searchBar from '@/components/hy-search-bar/index.vue'
import hyDownloadTips from '@/components/hy-download-tips/index.vue'
import icon_heidou from '@/static/mine_hei_dou.png'
import { isAlipayClient, isWeChat } from '@/utils/common'
import { sharePathFormat } from '@/common/wechat-share'

const userStore = useUserStore()
const { hasLogin, walletList } = storeToRefs(userStore)
const categoryList = reactive({
  list1: [],
  list2: []
})
const bannerList = ref([])
const productList = reactive({
  pageIndex: 1,
  pageSize: 18,
  finished: false,
  list: []
})
const status = ref('loadmore')
const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
const getBaseDataFn = async (type: any, callback: (arg0: any) => void) => {
  const { data } = await baseApi.getAdvertisingList({
    pageIndex: 1,
    pageSize: 10,
    type
  })
  callback(data)
}
const toProductDetail = (product: { shopId: any; productId: any }) => {
  const { shopId, productId } = product
  uni.navigateTo({
    url: `/pages/productDetail/index?shopId=${shopId}&productId=${productId}`
  })
}

// 跳转线下店列表页面
const toPhysicalStore = (content: any) => {
  uni.navigateTo({
    url: `/pages/physicalShopList/index?categoryData= ${content}`
  })
}
const toHeidouShop = () => {
  uni.navigateTo({
    url: '/packageB/pages/heidouShop/index'
  })
}
const toShopProduct = () => {}
const toDevice = () => {}
const toWebview = (url: string) => {
  uni.navigateTo({
    url: `/pages/webview/index?url=${url}`
  })
}
const handleClick = (adv: { webUrl: any; objectType: any }) => {
  if (!adv.webUrl) {
    switch (adv.objectType) {
      case 10:
        toShopProduct()
        break
      case 13:
        toPhysicalStore(adv.content)
        break
      case 100:
        toDevice()
        break
      default:
        break
    }
  } else {
    toWebview(adv.webUrl)
  }
}
const onSearch = () => {
  uni.navigateTo({
    url: '/pages/physicalShopList/index'
  })
}

const moneyInfo = ref([
  {
    money: 0,
    walletRuleId: 6,
    name: '黑豆钱包'
  }
])
moneyInfo.value.forEach((e) => {
  e.money = computed(() => {
    const money = walletList.value.find(
      (item) => item.walletRuleId === e.walletRuleId
    )?.money
    return money || 0
  })
})
const handleBannerClick = (data: { objectType: any; webUrl: any }) => {
  const { objectType, webUrl, content } = data
  switch (objectType) {
    case 0:
      // dev const url = ''
      if (webUrl) {
        uni.navigateTo({
          url: `/pages/webview/index?url=${webUrl}`
        })
      }
      break
    case 13:
      if (content) {
        const obj = JSON.parse(content)
        uni.navigateTo({
          url: `/pages/physicalShop/index?shopId=${obj.id}&shopType=${obj.shopType}`
        })
      }
      break
    default:
      break
  }
}
onReady(async () => {
  // 线下好店
  getBaseDataFn(baseApi.advertising_enum.ADV_HOME_LIST2, (data) => {
    categoryList.list1 = data.records
  })
  // banner
  getBaseDataFn(baseApi.advertising_enum.ADV_HOME_BANNER1, (data) => {
    bannerList.value = data.records
  })

})
onReachBottom(() => {
  status.value = 'loading'
})
onShareAppMessage((_res) => {
  const sourceTime = new Date().getTime()
  return {
    title: '语音收款助手',
    path: sharePathFormat({ sourceTime })
  }
})
</script>
<template>
  <view class="container">

  </view>
</template>

<style lang="scss" scoped>
@import '@/styles/helper.scss';

.container {
  font-style: normal;
  text-align: center;
  min-height: 100vh;
  background-color: #f6f6f6;
}
</style>
