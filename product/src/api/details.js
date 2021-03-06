import instance from './index'
/* eslint-disable no-duplicate-imports */
import { instanceJson } from './index'

export default {
  details_orderRoutle ($baseData) {
    return instance.get('/web/orderManage/orderRoutle', {
      params: $baseData
    })
  },
  details_tableSendTable ($baseData) {
    return instance.get('/web/orderManage/orderDetail', {
      params: $baseData
    })
  },
  // 配送管理 -门店管理详情提交
  details_submitStoreAdd ($baseData) {
    return instance.post('/web/storeManage/add', $baseData)
  },
  details_storeAreaData () {
    return instance.get('/web/commData/allArea')
  },
  details_tableStoreTable ($baseData) {
    return instance.get('/web/storeManage/detail', {
      params: $baseData
    })
  },
  // 配送管理详情接口 [id=1]
  details_personData ($baseData) {
    return instance.get('/web/deliveryUserManage/detail', {
      params: $baseData
    })
  },
  // 配送管理详情订单列表接口 [score&isAbnormal=&range=&orderNo&deliveryUserId=1&page=0&pageSize=20 ]
  details_personTableData ($baseData) {
    return instance.get('/web/deliveryUserManage/orderList', {
      params: $baseData
    })
  },
  // 配送管理详情 - 查看身份证
  details_personViewIdCardData ($baseData) {
    return instance.get('/web/deliveryUserManage/viewIdCard', {
      params: $baseData
    })
  },
  // 配送管理-资格审核-查看身份证
  data_tableAuditCheckPwd ($baseData) {
    return instance.get('/web/deliveryUserManage/checkPwd', {
      params: $baseData
    })
  },
  /*
   * ========================================
   *
   *            按钮操作
   *
   * ========================================
   * */
  // 配送管理详情-升级/降级操作接口 [id、direction: 0降级 | 1升级]
  details_handlePersonUpDown ($baseData) {
    return instanceJson.post('/web/deliveryUserManage/changeLevel', $baseData, {
      responseType: 'json'
    })
  },
  // 配送管理详情-冻结接口 [id、direction: 0冻结 | 1解冻]
  details_handlePersonEnabled ($baseData) {
    return instanceJson.post('/web/deliveryUserManage/enable', $baseData)
  },
  // 订单管理 - 回退邮包 (id单个,ids批量,reason原因)
  details_handleOrderBackToYb ($baseData) {
    return instanceJson.post('/web/orderManage/backToYb', $baseData)
  },
  // 订单管理 - 关闭订单 (id)
  details_handleOrderClose ($baseData) {
    return instance.post('/web/orderManage/close', $baseData)
  },
  // 订单管理 - 手工推送 (id单个,ids批量)
  details_handleOrderRePush ($baseData) {
    return instanceJson.post('/web/orderManage/rePush', $baseData)
  },
  // 订单管理 - 异常订单下的人工处理 (列表里面的id,注意不是orderId)
  details_handleOrderManualHandle ($baseData) {
    return instanceJson.post('/web/orderManage/manualHandle', $baseData)
  },
  /*
   * ========================================
   *
   *            提交
   *
   * ========================================
   * */
  // 系统管理 - 公告管理 - 重新推送
  again_push ($baseData) {
    return instance.post('/web/systemNotice/repush', $baseData)
  },
  // 系统管理 - 公告管理 - 删除
  delete_push ($baseData) {
    return instance.post('/web/systemNotice/del', $baseData)
  },
  // 配送管理 -门店管理详情提交
  details_submitStore ($baseData) {
    return instance.post('/web/storeManage/edit', $baseData)
  },
  details_submitAudit ($baseData) {
    return instanceJson.post('/web/deliveryUserManage/audit', $baseData)
  }
}
