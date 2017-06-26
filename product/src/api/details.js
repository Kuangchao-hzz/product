import instance from './index'
var qs = require('qs')

export default {
  details_tableSendTable ($baseData) {
    return instance.get('/web/orderManage/orderDetail', {
      params: $baseData
    })
  },
  details_tableStoreTable ($baseData) {
    return instance.get('/web/storeManage/detail', {
      params: $baseData
    })
  },
  details_submitStoreTable ($baseData) {
    return instance.post('/web/storeManage/edit', qs.stringify($baseData))
  }
}
