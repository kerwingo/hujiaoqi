/*
 * @Description: 模拟数据
 * @Author: Kerwin
 * @Date: 2023-07-22 03:39:37
 * @LastEditTime: 2023-08-14 17:58:09
 * @LastEditors:  Please set LastEditors
 */

export const m_productList = [
  {
    moduleStr: '/api/v1/shop/product',
    id: 2208,
    productId: 100003040,
    categoryId: 400000,
    name: '【合伙人特权】手机管控系统希贤可儿体验卡9.9元*1000张',
    image: 'uploads/eb64af41-8814-46dd-8c8c-cd8ec14298c3.png',
    money: 1980,
    originalMoney: 9900,
    limitBeginTime: 1684771200,
    limitEndTime: 1688140799,
    supplierId: 1106,
    shopId: 1208,
    publishStatus: 1,
    dynamicPrice: false,
    couponSku: false,
    taskerSku: false,
    shopName: 'e起成长 学生手机防沉迷整体解决方案',
    shopCategoryId: 400023,
    shopType: 3,
    sortId: 1,
    remark:
      '【合伙人特权】手机管控系统希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
    createTime: 1684810123,
    updateTime: 1689316854,
    shop: {
      moduleStr: '/api/v1/shop',
      id: 1208,
      userId: 500440,
      addressId: 959,
      code: 'T692Y1',
      latitude: 30.658215,
      longitude: 104.054518,
      categoryId: 400023,
      name: 'e起成长 学生手机防沉迷整体解决方案',
      avatar: 'shop/-1642890654.jpg',
      license: 'shop/1605497742.jpg',
      shopType: 3,
      sort: 1000,
      status: 20,
      supportDynamicPrice: true,
      supportLotteryUserCoupon: false,
      supportTasker: false,
      moneyRuleId: 220,
      remark:
        'e起成长 学生手机防沉迷整体解决方案————让每一个学生都能绽放自己！',
      createTime: 1684074364,
      updateTime: 1684074364
    },
    bannerResources: [
      {
        moduleStr: '/api/v1/resource',
        id: 76454,
        type: 1,
        length: 0,
        height: 2131,
        width: 2834,
        resourceUrl: 'uploads/8f8a2914-2ac3-4d34-8780-271f8075e75f.png',
        objectType: 1,
        objectId: 100003040,
        objectFunctionType: 1,
        createTime: 1684810123,
        updateTime: 1684810123
      }
    ],
    resources: [],
    shopProductSkus: [
      {
        moduleStr: '/api/v1/shop/product/sku',
        id: 69358,
        tradeType: 1,
        shopId: 1208,
        productId: 100003040,
        productSkuId: 11193,
        name: '手机管控系统希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
        money: 1980,
        originalMoney: 9900,
        moneyOrderStatus: 20,
        dynamicPrice: false,
        couponSku: false,
        taskerSku: false,
        saleCount: 4,
        count: 9999,
        productSkuCountShared: true,
        publishStatus: 1,
        invoiceSupport: false,
        invoiceTypeSupport: 0,
        invoiceContentSupport: '',
        limitBeginTime: 1684771200,
        limitEndTime: 1688140799,
        sortId: 1,
        createTime: 1684810241,
        updateTime: 1689316860,
        productSku: {
          moduleStr: '/api/v1/product/sku',
          id: 11193,
          productId: 100003040,
          name: '手机管控系统希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
          image: 'uploads/c09a4f0c-ae5e-4b06-977c-1c39ea0445a7.png',
          money: 1980,
          count: 999995,
          publishStatus: 1,
          status: 0,
          sort: 1000,
          createTime: 1684810240,
          updateTime: 1689313352
        },
        shopProductSkuContents: [
          {
            moduleStr: '/api/v1/shop/product/sku/content',
            id: 76,
            shopProductSkuId: 69358,
            content: '希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
            count: 1,
            money: 1980,
            createTime: 1684814938,
            updateTime: 1684814938
          }
        ],
        product: {
          moduleStr: '/api/v1/product',
          id: 100003040,
          categoryId: 400000,
          name: '【合伙人特权】手机管控系统希贤可儿体验卡9.9元*1000张',
          image: 'uploads/eb64af41-8814-46dd-8c8c-cd8ec14298c3.png',
          money: 1980,
          supplierId: 1106,
          sortId: 1,
          remark:
            '【合伙人特权】手机管控系统希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
          createTime: 1684810123,
          updateTime: 1689316854,
          productSkus: [
            {
              moduleStr: '/api/v1/product/sku',
              id: 11193,
              productId: 100003040,
              name: '手机管控系统希贤可儿体验卡9.9元*1000张，赠送【合伙人】名额一个',
              image: 'uploads/c09a4f0c-ae5e-4b06-977c-1c39ea0445a7.png',
              money: 1980,
              count: 999995,
              publishStatus: 1,
              status: 0,
              sort: 1000,
              createTime: 1684810240,
              updateTime: 1689313352
            }
          ],
          supplier: {
            moduleStr: '/api/v1/supplier',
            id: 1106,
            userId: 500440,
            objectType: 13,
            objectId: 1208,
            addressId: 959,
            name: 'e起成长 学生手机防沉迷整体解决方案',
            avatar: 'shop/-1642890654.jpg',
            license: 'shop/1605497742.jpg',
            sort: 1000,
            status: 20,
            remark:
              'e起成长 学生手机防沉迷整体解决方案————让每一个学生都能绽放自己！',
            createTime: 1684117020,
            updateTime: 1684117020
          },
          productAttributes: [
            {
              moduleStr: '/api/v1/product/attribute',
              id: 4608,
              productId: 100003040,
              productAttributeTypeId: 7,
              name: '功能',
              createTime: 1684810123,
              updateTime: 1684810123
            }
          ]
        }
      }
    ],
    category: {
      moduleStr: '/api/v1/category',
      id: 400000,
      parentId: 0,
      name: '教育培训',
      sort: 520,
      type: 1,
      createTime: 1679901512,
      updateTime: 1680843339
    }
  }
]

export const m_fcate = [
  {
    name: '董事长'
  },
  {
    name: '创始人'
  },
  {
    name: '总经理'
  },
  {
    name: '个体户'
  }
]
