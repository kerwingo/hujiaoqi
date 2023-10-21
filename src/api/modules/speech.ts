/* eslint-disable no-shadow */
/*
 * @Description: 物联网（充电宝）相关接口，使用用的api地址来自蒲哥，文档地址http://47.98.169.155:16588/#/home
 * @Author: Kerwin
 * @Date: 2023-10-10 16:46:56
 * @LastEditTime: 2023-10-21 11:08:37
 * @LastEditors:  Please set LastEditors
 */
import { RequestHttp, RequestEnums } from '../http'
import { speechUrl as BASEURL } from '@/common/config'

const CONFIG = {
  baseURL: BASEURL,
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true,
  isIot: true,
  success: 0
}
const http = new RequestHttp(CONFIG)

/**
 * 获取语音
 */
function getSpeek(data: any) {
  return http.post('/getSpeek.php', data)
}

export default {
  getSpeek
}
