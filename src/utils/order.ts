/* eslint-disable guard-for-in */
const OrderStatus = [
  {
    type: 0,
    name: '默认',
    title: '默认',
    supportCancel: false,
    supportDelete: false
  },
  {
    type: 10,
    name: '下单待支付',
    title: '下单待支付',
    supportCancel: true,
    supportDelete: false
  },
  {
    type: 11,
    name: '推送订单状态',
    title: '推送订单状态',
    supportCancel: false,
    supportDelete: false
  },
  {
    type: 20,
    name: '已支付待发货',
    title: '已支付待发货',
    supportCancel: true,
    supportDelete: false
  },
  {
    type: 30,
    name: '运输中',
    title: '运输中',
    supportCancel: false,
    supportDelete: false
  },
  {
    type: 40,
    name: '用户确认完成',
    title: '用户确认完成',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 50,
    name: '门店确认完成',
    title: '门店确认完成',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 60,
    name: '订单完成',
    title: '订单完成',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 70,
    name: '订单用户取消',
    title: '订单用户取消',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 80,
    name: '订单门店取消',
    title: '订单门店取消',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 90,
    name: '订单取消',
    title: '订单取消',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 91,
    name: '订单过期取消',
    title: '订单过期取消',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 92,
    name: '订单退款取消',
    title: '订单退款取消',
    supportCancel: false,
    supportDelete: true
  },
  {
    type: 100,
    name: '删除订单',
    title: '用户删除订单',
    supportCancel: false,
    supportDelete: false
  }
]

export function getOrderStatus(status: number) {
  let ret = {}
  for (const i in OrderStatus) {
    const item = OrderStatus[i]
    if (item.type === status) {
      ret = item
      break
    }
  }
  return ret
}

export function getPayWillStatus() {
  return getOrderStatus(10)
}

export function getCancelStatus() {
  return getOrderStatus(90)
}

export function getDeletedStatus() {
  return getOrderStatus(100)
}

export function getAllStatuses() {
  return '10,11,20,30,40,50,60,70,80,90,91,92'
}

export function getStatuses(status: any) {
  let ret = ''
  switch (status) {
    case 0:
      ret = '10,11,20,30,40,50,60,70,80,90,91,92'
      break
    case 10:
      ret = '10,11'
      break
    case 20:
      ret = '20,30'
      break
    case 60:
      ret = '40,50,60'
      break
    case 90:
      ret = '70,80,90,91,92'
      break
    default:
      ret = '10,11,20,30,40,50,60,70,80,90,91,92'
      break
  }
  return ret
}

export function getStatusTitle(status: number) {
  let ret = '默认1'
  for (const i in OrderStatus) {
    const item = OrderStatus[i]
    if (item.type === status) {
      ret = item.title
      break
    }
  }
  return ret
}

export function supportCancel(status: number) {
  let ret = false
  for (const i in OrderStatus) {
    const item = OrderStatus[i]
    if (item.type === status) {
      ret = item.supportCancel
      break
    }
  }
  return ret
}

export function supportDelete(status: number) {
  let ret = false
  for (const i in OrderStatus) {
    const item = OrderStatus[i]
    if (item.type === status) {
      ret = item.supportDelete
      break
    }
  }
  return ret
}

export default {
  OrderStatus,
  getOrderStatus,
  getPayWillStatus,
  getCancelStatus,
  getDeletedStatus,
  getAllStatuses,
  getStatuses,
  getStatusTitle,
  supportCancel,
  supportDelete
}
