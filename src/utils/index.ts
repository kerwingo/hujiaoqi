/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const store = useUserStore()
const { hasLogin } = storeToRefs(store)

export const getPrePage = (index?: any) => {
  const pages = getCurrentPages()
  const prePage = pages[pages.length - (index || 2)]
  // #ifdef H5
  return prePage
  // #endif
  return prePage.$vm
}
/**
 * 开发环境全局打印日志
 * @param {Object} title
 */
export const log = (title: object) => {
  if (process.env.NODE_ENV === 'development' && Boolean(title) === true) {
    console.log(JSON.stringify(title))
  }
}

export const dateFormat = (date: Date, fmt: string) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
function padLeftZero(str: string | any[]) {
  return `00${str}`.substr(str.length)
}

/**
 * 拼接图片地址
 * @param {String} suffix
 */
const FILE_URL = 'https://image.blacksilverscore.com/'
export const getImgFullPath = (suffix: string) => {
  if (!suffix) return
  if (suffix.includes('http' || 'https')) {
    return suffix
  }
  return FILE_URL + suffix
}

// 计算距离的方法实现
function rad(d: number) {
  return (d * Math.PI) / 180.0
}
// 腾讯/高德地图经纬度转换成百度经纬度
export function qqMapTransBMap(lat: any, lng: any) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0
  const x = lng
  const y = lat
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  const lngs = z * Math.cos(theta) + 0.0065
  const lats = z * Math.sin(theta) + 0.006

  return {
    lng: lngs,
    lat: lats
  }
}
// 百度经纬度转换成腾讯/高德地图经纬度
export function bMapTransQQMap(lat: number, lng: number) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  const lngs = z * Math.cos(theta)
  const lats = z * Math.sin(theta)

  return {
    lng: lngs,
    lat: lats
  }
}
// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function getDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
  const qqMapLocation = bMapTransQQMap(lat2, lng2)
  return new Promise((resolve, reject) => {
    const radLat1 = rad(lat1)
    const radLat2 = rad(qqMapLocation.lat)
    const a = radLat1 - radLat2
    const b = rad(lng1) - rad(qqMapLocation.lng)
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.sin(a / 2) ** 2 +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(b / 2) ** 2
        )
      )
    s *= 6378.137 // EARTH_RADIUS;
    // 输出为公里
    s = Math.round(s * 10000) / 10000

    const distance = s
    let distance_str = ''

    if (parseInt(distance, 10) >= 1) {
      distance_str = `${distance.toFixed(2)} km`
    } else {
      distance_str = `${(distance * 1000).toFixed(2)} m`
    }
    const objData = {
      distance,
      distance_str
    }
    resolve(objData)
  })
}
export function getDistanceMatrix(lat1: any, lng1: any, lat2: any, lng2: any) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://apis.map.qq.com/ws/distance/v1/matrix',
      method: 'GET',
      data: {
        mode: 'walking',
        from: `${lat1},${lng1}`,
        to: `${lat2},${lng2}`,
        key: 'WZUBZ-XKZ3W-EXIRA-3IAU7-MHXY7-ARBJO'
      },
      success: (res) => {
        let { distance } = res.data.result.rows[0].elements[0] // 拿到距离(米)
        let distance_str = ''
        if (distance && distance !== -1) {
          if (distance < 1000) {
            distance_str = `${distance}m`
          }
          // 转换成公里
          else {
            distance_str = `${(distance / 2 / 500).toFixed(2)}km`
          }
        } else {
          distance = '距离太近或请刷新重试'
        }
        const objData = {
          distance,
          distance_str
        }
        resolve(objData)
      }
    })
  })
}

export function handleMapLocation(to: {
  latitude: any
  longitude: any
  addr: any
}) {
  const { latitude, longitude, addr } = to
  console.log('进入导航')
  // 获取定位信息
  uni.getLocation({
    type: 'gcj02',
    success(res) {
      // eslint-disable-next-line eqeqeq
      if (res.errMsg == 'getLocation:ok') {
        uni.openLocation({
          latitude: bMapTransQQMap(latitude, longitude).lat,
          longitude: bMapTransQQMap(latitude, longitude).lng,
          address: addr,
          scale: 18,
          success() {
            console.log('成功的回调success')
          }
        })
      }
    },
    fail(res) {
      console.log(res)
      if (res.errMsg == 'getLocation:fail auth deny') {
        uni.showModal({
          content: '检测到您没打开获取信息功能权限，是否去设置打开？',
          confirmText: '确认',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting({
                success: (res) => {
                  console.log('确定')
                }
              })
            } else {
              console.log('取消')
              return false
            }
          }
        })
      }
    }
  })
}

// 预览图片
export function previewImage(pics: any, current?: any) {
  if (!pics) return
  uni.previewImage({
    urls: pics,
    current,
    indicator: 'default'
  })
}
// 检查登录态
export function checkLoginState() {
  if (!hasLogin.value) {
    uni.navigateTo({
      url: '/pages/login/index'
    })
    return false
  }
  return true
}
// 调用电话
export function makePhoneCall(phoneNumber: any) {
  if (!phoneNumber) return
  uni.makePhoneCall({
    phoneNumber
  })
}

export default {
  getPrePage,
  log,
  getImgFullPath,
  getDistance,
  getDistanceMatrix,
  previewImage,
  checkLoginState,
  makePhoneCall,
  dateFormat
}
