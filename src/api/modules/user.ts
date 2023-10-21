/*
 * @Description: Description
 * @Author: Kerwin
 * @Date: 2023-10-14 19:46:46
 * @LastEditTime: 2023-10-14 19:47:03
 * @LastEditors:  Please set LastEditors
 */
import http from '../http'

enum LOGIN_TYPE_ENUM {
  SMS_CODE = 20, // 短信验证码登录
  PWD = 10, // 密码登录
  WECHAT = 30, // 微信登录
  QQ = 31, // QQ登录
  WECHATPUBLIC = 32, // 微信公众号登录
  MINIWECHAT = 33, // 微信小程序登录
  APPLE = 35, // apple登录
  BAR_CODE_SCANNER = 50 // 扫码机登录
}

function wxMiniLogin() {
  return http.post('/auth/api/v1/auth/wxMiniLogin')
}

function wxWebLogin() {
  return http.post('/auth/api/v1/auth/wxWebLogin')
}

function login(data: any) {
  return http.post('/auth/api/v1/auth/login', data)
}

function register(data: any) {
  return http.post('/auth/api/v1/auth/register', data)
}
/**
 * 获取微信电话号码(小程序)
 * @param phone 手机号
 */
function wxUserPhoneNumber(data: any) {
  return http.post('/auth/api/v1/auth/wxUserPhoneNumber', data)
}
/**
 * 获取验证码
 * @param phone 手机号
 */
function getCode(phone: string): Promise<{ num: number }> {
  return http.get('random/code', {
    params: {
      phone
    }
  })
}
/**
 * 用户信息
 */
function userInfo() {
  return http.get('/ups/api/v1/user/info')
}
function userInfoUpdate(data: any) {
  return http.post('/ups/api/v1/user/update', data)
}
/**
 * 地址
 */
function getAddressList(data: any) {
  return http.get('/ups/api/v1/user/address/list', data)
}
function getAddressInfo(data: any) {
  return http.get('/ups/api/v1/user/address/info', data)
}
function updateAddressInfo(data: any) {
  return http.post('/ups/api/v1/user/address/update', data)
}
function deleteAddressInfo(data: any) {
  return http.get('/ups/api/v1/user/address/delete', data)
}
function addressAdd(data: any) {
  return http.post('/ups/api/v1/user/address/add', data)
}

export default {
  login,
  register,
  wxMiniLogin,
  wxWebLogin,
  getCode,
  getAddressList,
  getAddressInfo,
  updateAddressInfo,
  deleteAddressInfo,
  addressAdd,
  userInfo,
  userInfoUpdate,
  wxUserPhoneNumber,
  LOGIN_TYPE_ENUM
}
