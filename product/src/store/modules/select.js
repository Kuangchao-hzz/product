import api from '../../api/table'
const select = {
  state: {
    country: [{
      value: '1',
      label: '上海',
      children: [{
        value: '1',
        label: '上海市',
        children: [{
          value: '1',
          label: '宝山区'
        }, {
          value: '2',
          label: '徐汇区'
        }]
      }]
    }],
    treeCountry: [],
    orderType: [{
      value: '',
      label: '订单类型'
    }, {
      value: '普通',
      label: '普通'

    }, {
      value: '水果',
      label: '水果'
    }, {
      value: '海鲜',
      label: '海鲜'
    }, {
      value: '冻品',
      label: '冻品'
    }],
    abnormalType: [{
      value: '',
      label: '异常类型'
    }, {
      value: '1',
      label: '无人抢单'
    }, {
      value: '2',
      label: '主动退单'
    }, {
      value: '3',
      label: '超时未送'

    }, {
      value: '4',
      label: '超时未达'
    }, {
      value: '5',
      label: '商城关闭'
    }, {
      value: '6',
      label: '客户拒单'
    }, {
      value: '7',
      label: '商城退换货'
    }],
    abnormalStart: [{
      value: '',
      label: '异常状态'
    }, {
      value: '1',
      label: '异常订单'
    }, {
      value: '2',
      label: '正常订单'
    }],
    disposeType: [{
      value: '',
      label: '处理状态'
    }, {
      value: '1',
      label: '全部'
    }, {
      value: '2',
      label: '未处理'
    }, {
      value: '3',
      label: '已处理'
    }, {
      value: '4',
      label: '自动处理'
    }],
    orderStatus: [{
      value: '',
      label: '订单状态'
    }, {
      value: '1',
      label: '待拣货'
    }, {
      value: '2',
      label: '待验货'
    }, {
      value: '3',
      label: '送货中'
    }, {
      value: '3',
      label: '已送达'
    }, {
      value: '4',
      label: '回退邮包'
    }, {
      value: '5',
      label: '订单关闭'
    }],
    pushOrderType: [{
      value: '',
      label: '抢单状态'
    }, {
      value: '1',
      label: '已抢单'
    }, {
      value: '2',
      label: '未抢单'
    }],
    orderLevel: [{
      value: '',
      label: '订单评价'
    }, {
      value: '1',
      label: '1级'
    }, {
      value: '2',
      label: '2级'
    }, {
      value: '3',
      label: '3级'
    }, {
      value: '4',
      label: '4级'
    }, {
      value: '5',
      label: '5级'
    }],
    personLevel: [{
      value: '',
      label: '等级'
    }, {
      value: '1',
      label: '1星'
    }, {
      value: '2',
      label: '2星'
    }, {
      value: '3',
      label: '3星'
    }, {
      value: '4',
      label: '4星'
    }, {
      value: '5',
      label: '5星'
    }],
    category: [{
      value: '',
      label: '类别'

    }, {
      value: '1',
      label: '员工'

    }, {
      value: '2',
      label: '社会人'

    }],
    workStatus: [{
      value: '',
      label: '工作状态'
    }, {
      value: '1',
      label: '抢单中'
    }, {
      value: '2',
      label: '休息中'
    }, {
      value: '3',
      label: '配送中'
    }],
    payStatus: [{
      value: '',
      label: '结算状态'
    }, {
      value: '1',
      label: '未结算'
    }, {
      value: '2',
      label: '已结算'
    }],
    accountStatus: [{
      value: '',
      label: '账号状态'
    }, {
      value: '1',
      label: '正常'
    }, {
      value: '2',
      label: '冻结'
    }],
    idStatus: [{
      value: '',
      label: '账号状态'
    }, {
      value: '-1',
      label: '全部'
    }, {
      value: '1',
      label: '已注册'
    }, {
      value: '0',
      label: '未注册'
    }],
    timeBetween: [{
      value: '',
      label: '时间范围'
    }, {
      value: '1',
      label: '最近7天'
    }, {
      value: '2',
      label: '最近30天'
    }, {
      value: '3',
      label: '全部'
    }],
    store: [{
      value: '',
      label: '请选择门店'
    }, {
      value: '1',
      label: '大场店'
    }, {
      value: '2',
      label: '徐汇店'
    }],
    ruleTime: [{
      value: '1',
      label: '立即推送'
    }, {
      value: '2',
      label: '拣货后推送'
    }, {
      value: '3',
      label: '期望送达时间前30分钟推送'
    }]
  },
  mutations: {
    SET_AREAANDSTORE ($state, $data) {
      $state.treeCountry = $data
    }
  },
  actions: {
    fetch_allAreaAndStore ({ commit }) {
      return new Promise(resolve => {
        api.fetch_allAreaAndStore().then((response) => {
          if (response.data.code !== 1) {
            swal(response.data.msg)
          } else {
            commit('SET_AREAANDSTORE', response.data.dat)
            resolve()
          }
        })
      })
    }
  }
}

export default select
