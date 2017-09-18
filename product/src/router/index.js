import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = resolve => require(['../common/Layout/layout.vue'], resolve)

export const includeRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: 'abnormalDetails',
        name: '异常订单详情',
        component: resolve => require(['../components/details/abnormal.vue'], resolve)
      },
      {
        path: 'allDetails',
        name: '全部订单详情',
        component: resolve => require(['../components/details/all.vue'], resolve)
      },
      {
        path: '/order/orderDetails',
        name: '订单详情',
        component: resolve => require(['../components/details/orderDetails.vue'], resolve)
      },
      {
        path: '/delivery/storeDetails',
        name: '门店详情',
        component: resolve => require(['../components/details/store.vue'], resolve)
      },
      {
        path: '/person/personDetails',
        name: '配送员详情',
        component: resolve => require(['../components/details/person.vue'], resolve)
      },
      {
        path: '/person/auditDetails',
        name: '审核详情',
        component: resolve => require(['../components/details/audit.vue'], resolve)
      },
      {
        path: '/system/noticeDetails',
        name: '公告详情',
        component: resolve => require(['../components/details/notice.vue'], resolve)
      }
    ]
  }, {
    path: '/login',
    name: '登录页',
    component: resolve => require(['../components/include/Login.vue'], resolve)
  }, {
    path: '/forget',
    component: resolve => require(['../components/include/forget-login.vue'], resolve)
  }, {
    path: '/resetPassword',
    component: resolve => require(['../components/include/reset-login.vue'], resolve)
  }
]

export default new Router({
  routes: includeRouterMap
})

export const asyncRouterMap = [
  {
    path: '/data',
    name: '数据统计',
    icon: 'icon icon-data',
    meta: {
      role: ['m_sjtj', 'm_pstj', 'm_psytj', '$admin']
    },
    component: Layout,
    children: [
      {
        path: 'delivery',
        name: '配送统计',
        meta: {
          role: ['m_pstj', '$admin']
        },
        component: resolve => require(['../components/manage-data/childrens/delivery.vue'], resolve)
      },
      {
        path: 'people',
        name: '配送员统计',
        meta: {
          role: ['m_psytj', '$admin']
        },
        component: resolve => require(['../components/manage-data/childrens/people.vue'], resolve)
      }
    ]
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'icon icon-order',
    meta: {
      role: ['m_ddgl', 'm_dtdd', 'm_dqdd', 'm_ycdd', 'm_qbdd']
    },
    component: Layout,
    children: [
      {
        path: 'waitSendOrder',
        name: '待推订单',
        meta: {
          role: ['m_dtdd', 'b_qt_qbdc_excel', 'b_htyb']
        },
        component: resolve => require(['../components/manage-order/childrens/waitSendOrder.vue'], resolve)
      },
      {
        path: 'waitPushOrder',
        name: '待抢订单',
        meta: {
          role: ['m_dqdd', 'b_qt_qbdc_excel', 'b_htyb', 'b_sgts']
        },
        component: resolve => require(['../components/manage-order/childrens/waitPushOrder.vue'], resolve)
      },
      {
        path: 'abnormalOrder',
        name: '异常订单',
        meta: {
          role: ['m_ycdd', 'b_yc_dc_excel', 'b_td', 'b_gbdd', 'b_rgcl']
        },
        component: resolve => require(['../components/manage-order/childrens/abnormalOrder.vue'], resolve)
      },
      {
        path: 'allOrder',
        name: '全部订单',
        meta: {
          role: ['m_qbdd', 'b_td', 'b_gbdd']
        },
        component: resolve => require(['../components/manage-order/childrens/allOrder.vue'], resolve)
      }
    ]
  },
  {
    path: '/person',
    name: '配送管理',
    icon: 'icon icon-person',
    meta: {
      role: ['m_psgl', 'm_psdt', 'm_psygl', 'm_zzsh', 'm_cwjs']
    },
    component: Layout,
    children: [
      {
        path: 'map',
        name: '配送地图',
        meta: {
          role: ['m_psdt']
        },
        component: resolve => require(['../components/manage-person/childrens/map.vue'], resolve)
      },
      {
        path: 'manage',
        name: '配送员管理',
        meta: {
          role: ['m_psygl', 'b_ps_sj', 'b_ps_jj', 'b_ps_djzh', 'b_ps_zhjd']
        },
        component: resolve => require(['../components/manage-person/childrens/manage.vue'], resolve)
      },
      {
        path: 'audit',
        name: '资格审核',
        meta: {
          role: ['m_zzsh', 'b_zz_shtg', 'b_zz_shbtg', 'b_zz_qbdc_excel']
        },
        component: resolve => require(['../components/manage-person/childrens/audit.vue'], resolve)
      },
      {
        path: 'money',
        name: '财务结算',
        meta: {
          role: ['m_cwjs', 'b_cw_dc_excel', 'b_cw_dr_excel']
        },
        component: resolve => require(['../components/manage-person/childrens/money.vue'], resolve)
      }
    ]
  },
  {
    path: '/delivery',
    name: '配送设置管理',
    icon: 'icon icon-delivery',
    meta: {
      role: ['m_psszgl', 'm_mdgl', 'm_mdrygl', 'm_pssz', 'm_psdjsz', 'm_tsgzsz']
    },
    component: Layout,
    children: [
      {
        path: 'store',
        name: '门店管理',
        meta: {
          role: ['m_mdgl']
        },
        component: resolve => require(['../components/manage-delivery/childrens/store.vue'], resolve)
      },
      {
        path: 'storePerson',
        name: '门店人员管理',
        meta: {
          role: ['m_mdrygl']
        },
        component: resolve => require(['../components/manage-delivery/childrens/storePerson.vue'], resolve)
      },
      {
        path: 'money',
        name: '费用设置',
        meta: {
          role: ['m_pssz']
        },
        component: resolve => require(['../components/manage-delivery/childrens/money.vue'], resolve)
      },
      {
        path: 'level',
        name: '配送等级设置',
        meta: {
          role: ['m_psdjsz']
        },
        component: resolve => require(['../components/manage-delivery/childrens/level.vue'], resolve)
      },
      {
        path: 'rule',
        name: '推送规则设置',
        meta: {
          role: ['m_tsgzsz']
        },
        component: resolve => require(['../components/manage-delivery/childrens/rule.vue'], resolve)
      }
    ]
  },
  {
    path: '/system',
    name: '系统设置',
    icon: 'icon icon-system',
    meta: {
      role: ['m_xtsz', 'm_gggl', 'm_yhgl', 'm_jsgl', 'm_ygpbgl', 'm_kfgl', 'm_appbbgl', 'm_sybzgl', 'm_ddgl']
    },
    component: Layout,
    children: [
      {
        path: 'notice',
        name: '公告管理',
        meta: {
          role: ['m_gggl', 'b_gg_fbgg']
        },
        component: resolve => require(['../components/manage-system/childrens/notice.vue'], resolve)
      },
      {
        path: 'user',
        name: '用户管理',
        meta: {
          role: ['m_yhgl', 'b_yh_xzyh', 'b_yh_bj', 'b_yh_dj', 'b_yh_sc']
        },
        component: resolve => require(['../components/manage-system/childrens/user.vue'], resolve)
      },
      {
        path: 'role',
        name: '角色管理',
        meta: {
          role: ['m_jsgl', 'b_jz_xzyh', 'b_jz_bj', 'b_jz_sc']
        },
        component: resolve => require(['../components/manage-system/childrens/role.vue'], resolve)
      },
      {
        path: 'staff',
        name: '员工排班管理',
        meta: {
          role: ['m_ygpbgl', 'b_yg_dyygbb', 'b_yg_xzmb', 'b_yg_bj']
        },
        component: resolve => require(['../components/manage-system/childrens/staff.vue'], resolve)
      },
      {
        path: 'service',
        name: '客服管理',
        meta: {
          role: ['m_kfgl', 'b_kf_bj']
        },
        component: resolve => require(['../components/manage-system/childrens/service.vue'], resolve)
      },
      {
        path: 'app',
        name: 'APP版本管理',
        meta: {
          role: ['m_appbbgl', 'b_app_tjxbb']
        },
        component: resolve => require(['../components/manage-system/childrens/app.vue'], resolve)
      }
      // {
      //   path: 'help',
      //   name: '使用帮助',
      //   meta: {
      //     role: ['m_sybzgl', 'b_bz_bc']
      //   },
      //   component: resolve => require(['../components/manage-system/childrens/help.vue'], resolve)
      // }
    ]
  },
  {
    path: '*', component: resolve => require(['../components/404/index.vue'], resolve)
  }
]
