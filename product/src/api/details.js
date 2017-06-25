import instance from './index'

export default {
  details_tableSendTable ($baseData) {
    return instance.get('/o2o/web/orderManage/orderDetail', {
      params: $baseData
    })
  }
}
