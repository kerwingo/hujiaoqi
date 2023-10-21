/* eslint-disable no-shadow */
/*
 * @Description: 全局的枚举
 * @Author: Kerwin
 * @Date: 2023-08-10 10:12:27
 * @LastEditTime: 2023-08-25 14:45:22
 * @LastEditors:  Please set LastEditors
 */

enum advertising_enum {
  ADV_HOME_LIST1 = 1000, // 黑银首页最上面的广告位
  ADV_HOME_LIST2 = 1001, // 黑银首页圆功能的广告位-黑银积分兑换
  ADV_HOME_LIST3 = 1002, // 黑银首页圆功能的广告位-现金付款
  ADV_HOME_LIST4 = 1003, // 黑银首页圆功能的广告位-充值找店家
  ADV_HOME_LIST5 = 1004, // 黑银首页圆功能的广告位-黑豆兑换
  ADV_HOME_LIST6 = 1005, // 黑银首页圆功能的广告位-黑豆兑换
  ADV_HOME_LIST7 = 1006, // 黑银首页圆功能的广告位-黑豆兑换 生活服务
  ADV_HOME_BANNER1 = 1011, // 黑银首页Banner的广告位-全城会员充值位"
  ADV_HOME_BANNER2 = 1012, // 黑银首页Banner的广告位-合伙人计划
  ADV_HOME_BANNER3 = 1021, // 黑银首页推荐的广告位
  CONTACT_HOME_LIST1 = 3000, // 黑银社交首页最上面的广告位
  ADV_FAMOUS_LIST = 5000 // 黑银名人堂-名人分类
}
// 审核状态
enum audit_status_enum {
  DEFAULT = 0, // 默认
  PENDING = 10, // 审核中
  SUCCESS = 20, // 审核成功
  REJECT = 21 // 审核拒绝
}

export default {
  advertising_enum,
  audit_status_enum
}
