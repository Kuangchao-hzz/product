/* eslint-disable no-duplicate-imports */

import instance from './index'

export default {
  // 全部地区(包含门店)
  fetch_allAreaAndStore ($baseData) {
    return instance.get('/web/commData/allAreaAndStore', {
      params: $baseData
    })
  },
  // 全部地区(包含门店)
  fetch_areaAndStore ($baseData) {
    return instance.get('/web/user/areaAndStore', {
      params: $baseData
    })
  },
    // 全部地区(包含门店)
  fetch_areaData ($baseData) {
    return instance.get('/web/user/area', {
      params: $baseData
    })
  },
  // 门店
  fetch_storeOfArea ($baseData) {
    return instance.get('/web/user/storeOfArea', {
      params: $baseData
    })
  },
  // 数据统计-配送统计
  data_dataDeliveryTable ($baseData) {
    return instance.get('/web/dataStats/order', {
      params: $baseData
    })
  },
  // 数据统计-配送员统计
  data_dataPeopleTable ($baseData) {
    return instance.get('/web/dataStats/user', {
      params: $baseData
    })
  },
  // 订单管理-待推订单
  data_orderSendTable ($baseData) {
    return instance.get('/web/orderManage/dtOrderList', {
      params: $baseData
    })
  },
  // 订单管理-待抢订单
  data_orderPushTable ($baseData) {
    return instance.get('/web/orderManage/dqOrderList', {
      params: $baseData
    })
  },
  // 订单管理-异常订单列表 【page=0&pageSize=20&province=1&city=1&district=1&storeId=1&abnormalStatus=1&handlerStatus=1&phone=11111】
  data_orderAbnormalTable ($baseData) {
    return instance.get('/web/orderManage/abnormalList', {
      params: $baseData
    })
  },
  // 订单管理-所有订单列表 【orderNo&page=0&pageSize=20&province&city &district&storeId&mallTimeBegin&mallTimeEnd&arriveTimeBegin&arriveTimeEnd&orderStatus&grabStatus&markScore&phone】
  data_orderAllTable ($baseData) {
    return instance.get('/web/orderManage/allOrderList', {
      params: $baseData
    })
  },
  // 配送管理-资格审核
  data_personMapTable ($baseData) {
    return instance.get('/web/deliveryUserManage/geomap', {
      params: $baseData
    })
  },
  // 配送管理-配送员信息
  data_personMapInfo ($baseData) {
    return instance.get('/web/deliveryUserManage/deliveryMapInfo', {
      params: $baseData
    })
  },
  // 配送管理-资格审核
  data_tableAuditTable ($baseData) {
    return instance.get('/web/deliveryUserManage/auditList', {
      params: $baseData
    })
  },
  // 配送管理-配送管理
  data_personManageTable ($baseData) {
    return instance.get('/web/deliveryUserManage/list', {
      params: $baseData
    })
  },
  // 配送管理-财务管理
  data_personMoneyTable ($baseData) {
    return instance.get('/web/settlement/query', {
      params: $baseData
    })
  },

  // 配送设置管理-推送规则设置
  data_deliveryRuleTable ($baseData) {
    return instance.get('/web/pushRule/all', {
      params: $baseData
    })
  },
  // 配送设置管理-查询推送时间点
  data_fetchRuleTime ($baseData) {
    return instance.get('/web/pushRule/pushPoint', {
      params: $baseData
    })
  },
  // 配送设置管理-门店管理
  data_deliveryStoreTable ($baseData) {
    return instance.get('/web/storeManage/list', {
      params: $baseData
    })
  },
  // 配送设置管理-配送等级设置
  data_deliveryLevelTable ($baseData) {
    return instance.get('/web/orderLevel/all', {
      params: $baseData
    })
  },
  data_deliveryLevelTableAuto ($baseData) {
    return instance.get('/web/deliveryUpgrade/all', {
      params: $baseData
    })
  },
  // 配送设置管理-费用设置
  data_deliveryMoneyTable ($baseData) {
    return instance.get('/web/commissionRule/all', {
      params: $baseData
    })
  },
  // 系统设置-公告管理
  data_noticeTable ($baseData) {
    return instance.get('/web/systemNotice/list', {
      params: $baseData
    })
  },
  // 系统设置-角色管理-列表
  data_roleTable ($baseData) {
    return instance.get('/web/auth/allRole', {
      params: $baseData
    })
  },
  // 系统设置-用户管理-列表
  data_systemUserAll ($baseData) {
    return instance.get('/web/auth/allUser', {
      params: $baseData
    })
  },
  // 系统设置-用户管理-角色列表
  data_systemUserRoleList ($baseData) {
    return instance.get('/web/auth/roleList', {
      params: $baseData
    })
  },
  // 系统设置-角色管理-添加用户
  data_systemRoleDate ($baseData) {
    return instance.get('/web/auth/allAuth', $baseData)
  },
  // 系统设置-员工排版管理
  data_staffTable ($baseData) {
    return instance.get('/web/employeeManage/list', {
      params: $baseData
    })
  },
  // 系统设置-员工排班管理-编辑
  data_editStaffTable ($baseData) {
    return instance.get('/web/employeeManage/detail', {
      params: $baseData
    })
  },
  // 系统设置-客服管理
  data_editService ($baseData) {
    return instance.get('/web/commData/kefu', {
      params: $baseData
    })
  },
  // 系统设置-使用帮助-获取
  data_fetchUserHelp ($baseData) {
    return instance.get('/web/commData/useHelp', {
      params: $baseData
    })
  },
  /*
  * =====================================
  * 编辑
  * */
  edit_deliveryLevelTable ($baseData) {
    return instance.post('/web/orderLevel/edit', $baseData)
  },
  edit_deliveryLevelTableAuto ($baseData) {
    return instance.post('/web/deliveryUpgrade/edit', $baseData)
  },
  // 配送设置管理 -> 费用设置 -> 启用&禁用
  edit_personMoneyEnable ($baseData) {
    return instance.post('/web/commissionRule/enable', $baseData)
  },
  // 配送设置管理 -> 推送规则 -> 启用&禁用
  edit_personRuleEnable ($baseData) {
    return instance.post('/web/pushRule/enable', $baseData)
  },
  // 配送设置管理 -> 推送规则 -> 编辑
  edit_personRuleEdit ($baseData) {
    return instance.post('/web/pushRule/edit', $baseData)
  },
  // 配送设置管理 -> 费用设置 -> 编辑
  edit_personMoneyEdit ($baseData) {
    return instance.post('/web/commissionRule/edit', $baseData)
  },
  // 系统设置-公告管理-发布公告
  edit_systemNoticeTable ($baseData) {
    return instance.post('/web/systemNotice/publish', $baseData)
  },
  // 系统设置-员工排班管理-编辑
  edit_systemStaffDate ($baseData) {
    return instance.post('/web/employeeManage/editScheduling', $baseData)
  },
  // 系统设置-客服管理-保存
  edit_editService ($baseData) {
    return instance.post('/web/commData/kefu', $baseData)
  },
  // 系统设置-使用帮助-保存
  edit_userHelpSave ($baseData) {
    return instance.post('/web/commData/useHelp', $baseData)
  },
  // 配送设置管理-保存推送时间点
  edit_SaveRuleTime ($baseData) {
    return instance.post('/web/pushRule/pushPoint', $baseData)
  },
  // 系统设置-角色管理-添加&编辑用户
  data_systemRoleSave ($baseData) {
    return instance.post('/web/auth/roleSave', $baseData)
  },
  // 系统设置-角色管理-删除
  data_systemUserDel ($baseData) {
    return instance.post('/web/auth/userDel', $baseData)
  },
  // 系统设置-用户管理-新增
  data_systemUserSave ($baseData) {
    return instance.post('/web/auth/userSave', $baseData)
  },
  // 系统设置-用户管理- 解冻&解冻
  edit_systemUserHandlerLock ($baseData) {
    return instance.post('/web/auth/userLock', $baseData)
  }
}
