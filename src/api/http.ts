/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
// @ts-ignore
import buildURL from 'axios/lib/helpers/buildURL'
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { useUserStore } from '@/store'
import { isWeChat } from '@/utils/common'

const store = useUserStore()
type ParamsSerializer = AxiosRequestConfig['paramsSerializer']
function getFullURL(
  baseURL: string,
  url: string,
  params: Record<string, any>,
  paramsSerializer?: ParamsSerializer
) {
  if (url.startsWith('http')) {
    return buildURL(url, params, paramsSerializer)
  }
  baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`
  url = url.startsWith('/') ? url.slice(1) : url
  return buildURL(`${baseURL}${url}`, params, paramsSerializer)
}
interface Result {
  code: number
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}
let BASEURL: string
// Web 侧可以通过 vite.config.js 中的 proxy 配置，指定代理
// 小程序APP里需写完整路径，如 https://service-rbji0bev-1256505457.cd.apigw.tencentcs.com/release
// 可使用条件编译,详见 https://uniapp.dcloud.io/tutorial/platform.html#preprocessor
// #ifdef H5
BASEURL = import.meta.env.VITE_APP_AXIOS_BASE_URL
// #endif
// #ifndef H5
// @ts-ignore
BASEURL = 'https://api.blacksilverscore.com'
// #endif
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 401, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200 // 请求成功
}
const CONFIG = {
  baseURL: BASEURL,
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true
}

class RequestHttp {
  static instance: any

  showModal: boolean

  static getInstance() {
    if (!RequestHttp.instance) {
      RequestHttp.instance = new RequestHttp(CONFIG)
    }
    return RequestHttp.instance
  }

  // 定义成员变量并指定类型
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create({
      ...config,
      adapter(config) {
        // console.log('request adapter ↓↓')
        // console.log(config)
        const {
          url,
          method,
          data,
          params,
          headers,
          baseURL,
          paramsSerializer
        } = config
        return new Promise((resolve, reject) => {
          uni.request({
            method: method!.toUpperCase() as any,
            url: getFullURL(baseURL || '', url!, params, paramsSerializer),
            header: headers,
            data,
            dataType: 'json',
            responseType: config.responseType,
            success: (res: any) => {
              // console.log('request success ↓↓')
              // console.log(res)
              resolve(res)
            },
            fail: (err: any) => {
              reject(err)
            }
          })
        })
      }
    })
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = uni.getStorageSync('accessToken') || ''
        const wxCode = uni.getStorageSync('wxCode') || ''
        // #ifdef H5
        config.headers.platform = 50
        // #endif
        // #ifdef MP-WEIXIN
        config.headers.platform = 40
        // #endif
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        if (wxCode) {
          config.headers.code = wxCode
        }
        return config
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.showModal = false

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          store.syncClearToken()
          if (this.showModal) return
          this.showModal = true
          uni.showModal({
            title: '提示',
            content: '登录过期，请重新登录',
            showCancel: true,
            success: ({ confirm, cancel }) => {
              if (confirm) {
                // #ifdef MP-WEIXIN
                uni.navigateTo({
                  url: '/pages/login/index'
                })
                // #endif
                // #ifdef H5
                // const isWeChatBrowser = isWeChat()
                // if (isWeChatBrowser) {
                //   const { pathname } = window.location
                //   window.location.href = pathname
                // } else {
                //   uni.navigateTo({
                //     url: '/pages/login/index'
                //   })
                // }
                uni.navigateTo({
                  url: '/pages/login/index'
                })
                // #endif
              }
            },
            complete: () => {
              this.showModal = false
            }
          })
          return Promise.reject(data)
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code !== RequestEnums.SUCCESS) {
          this.handleCode(data.code, data.msg)
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          this.handleCode(response.data.code)
        }
      }
    )
  }

  handleCode(code: number, msg?: string): void {
    switch (code) {
      case 401:
        uni.showToast({
          icon: 'error',
          title: '登录过期，请重新登录'
        })
        break
      default:
        uni.showToast({
          icon: 'none',
          title: msg
        })
    }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

export default RequestHttp.getInstance()
