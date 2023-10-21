import { defineStore } from 'pinia'
import { isWeChat, isAlipayClient } from '@/utils/common'

const useStore = defineStore('config', {
  state: () => ({
    navBarHeight: 44,
    enterType: null,
    videoPageOpen: true,
    isWeChatBrowser: isWeChat(), // 微信浏览器
    isAlipayClient: isAlipayClient(), // 支付宝浏览器
    cardDefualtAvatar:
      'https://image.blacksilverscore.com/uploads/39d21a81-34a3-404d-9af4-09fac6441226.png', // 名片默认头像
    cardDefualtCoverImage:
      'https://image.blacksilverscore.com/uploads/cdac802e-2c3e-448e-a4ff-089bd7a3888e.jpg', // 名片默认背景
    uploadUrl: 'https://api.blacksilverscore.com/base/api/v1/ali/sendFile' // oss上传地址
  }),
  getters: {
    enterByStoreQrcode: (state) => state.enterType === 'storeQrcode' // 是否通过商家二维码链接进入页面
  },
  actions: {
    setEnterType(type: any) {
      this.enterType = type
    }
  }
})

export default useStore
