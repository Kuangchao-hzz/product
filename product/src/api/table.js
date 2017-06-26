import instance from './index'

export default {
  data_tableSendTable ($baseData) {
    return instance.get('/web/orderManage/dtOrderList', {
      params: $baseData
    })
  },
  data_tableAuditTable ($baseData) {
    return instance.get('/web/deliveryUserManage/auditList', {
      params: $baseData
    })
  },
  data_tableRuleTable ($baseData) {
    return instance.get('/web/pushRule/all', {
      params: $baseData
    })
  },
  data_tableStoreTable ($baseData) {
    return instance.get('/web/storeManage/list', {
      params: $baseData
    })
  }
}
