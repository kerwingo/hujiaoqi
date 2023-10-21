/*
 * @Description: Description
 * @Author: Kerwin
 * @Date: 2023-06-08 15:03:59
 * @LastEditTime: 2023-08-24 17:48:13
 * @LastEditors:  Please set LastEditors
 */

import { parseParams } from '@/utils/common'

/**
 * 微信js-sdk配置
 */
export const jsSdkConfig = (data: {
  appId: any
  timestamp: any
  nonceStr: any
  signature: any
}) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
  })
}
/**
 * 微信js-sdk自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
 */
export const updateAppMessageShareData = (data: {
  title: any
  desc: any
  link: any
  imgUrl: any
}) => {
  wx.updateAppMessageShareData({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success() {
      // 设置成功
    }
  })
}
/**
 * 微信js-sdk自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
 */
export const updateTimelineShareData = (data: {
  title: any
  desc: any
  link: any
  imgUrl: any
}) => {
  wx.updateTimelineShareData({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success() {
      // 设置成功
    }
  })
}
/**
 * 微信小程序分享路径格式化
 * @return{ path:string } 携带参数的完整路径
 */
export const sharePathFormat = (data: { [x: string]: any }) => {
  const pages = getCurrentPages()
  let redirect_url = `/${pages[pages.length - 1]?.route}`
  const shareCode = uni.getStorageSync('userInfo')?.shareCode
  if (data.redirect_url) {
    redirect_url = data.redirect_url
    delete data.redirect_url
  }
  return parseParams('/pages/launch/index', {
    redirect_url,
    shareCode,
    ...data
  })
}
export default {
  updateAppMessageShareData,
  updateTimelineShareData,
  sharePathFormat
}
