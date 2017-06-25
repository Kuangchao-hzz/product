import instance from './index'

export default {
  data_tableSendTable ($baseData) {
    return instance.get('/o2o/web/orderManage/dtOrderList', {
      params: $baseData
    })
  },
  data_tableAuditTable ($baseData) {
    return instance.get('/o2o/web/deliveryUserManage/auditList', {
      params: $baseData
    })
  }
}
