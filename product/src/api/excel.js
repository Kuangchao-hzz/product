import instance from './index'

export default {
  person_outExcel ($baseData) {
    return instance.get('/web/settlement/exportData', {
      params: $baseData
    })
  },
  system_staffExcel ($baseData) {
    return instance.get('/web/employeeManage/downloadTemplete', {
      params: $baseData
    })
  }
}
