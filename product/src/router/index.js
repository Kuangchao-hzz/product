import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: resolve => require(['../common/Layout/layout.vue'], resolve),
      children: [
        {
          path: '/delivery',
          name: '数据统计',
          component: resolve => require(['../components/manage-data/index.vue'], resolve),
          children: [
            {
              path: 'delivery',
              name: '配送统计',
              component: resolve => require(['../components/manage-data/childrens/delivery.vue'], resolve)
            },
            {
              path: 'people',
              name: '配送员统计',
              component: resolve => require(['../components/manage-data/childrens/people.vue'], resolve)
            }
          ]
        },
        {
          path: '/order',
          component: resolve => require(['../components/manage-order/index.vue'], resolve),
          name: '订单管理',
          children: [
            {
              path: 'waitSendOrder',
              name: '待推订单',
              component: resolve => require(['../components/manage-order/childrens/waitSendOrder.vue'], resolve)
            },
            {
              path: 'waitPushOrder',
              name: '待抢订单',
              component: resolve => require(['../components/manage-order/childrens/waitPushOrder.vue'], resolve)
            },
            {
              path: 'abnormalOrder',
              name: '异常订单',
              component: resolve => require(['../components/manage-order/childrens/abnormalOrder.vue'], resolve)
            },
            {
              path: 'allOrder',
              name: '全部订单',
              component: resolve => require(['../components/manage-order/childrens/allOrder.vue'], resolve)
            },
            {
              path: 'details',
              name: '订单详情',
              component: resolve => require(['../components/details/order.vue'], resolve)
            }
          ]
        },
        {
          path: '/person',
          name: '配送员管理',
          component: resolve => require(['../components/manage-person/index.vue'], resolve),
          children: [
            {
              path: 'map',
              name: '配送地图',
              component: resolve => require(['../components/manage-person/childrens/map.vue'], resolve)
            },
            {
              path: 'manage',
              name: '配送员管理',
              component: resolve => require(['../components/manage-person/childrens/manage.vue'], resolve)
            },
            {
              path: 'audit',
              name: '资格审核',
              component: resolve => require(['../components/manage-person/childrens/audit.vue'], resolve)
            },
            {
              path: 'money',
              name: '财务结算',
              component: resolve => require(['../components/manage-person/childrens/money.vue'], resolve)
            }
          ]
        },
        {
          path: '/delivery',
          name: '配送管理',
          component: resolve => require(['../components/manage-delivery/index.vue'], resolve),
          children: [
            {
              path: 'store',
              name: '门店管理',
              component: resolve => require(['../components/manage-delivery/childrens/store.vue'], resolve)
            },
            {
              path: 'money',
              name: '费用设置',
              component: resolve => require(['../components/manage-delivery/childrens/money.vue'], resolve)
            },
            {
              path: 'level',
              name: '配送等级设置',
              component: resolve => require(['../components/manage-delivery/childrens/level.vue'], resolve)
            },
            {
              path: 'rule',
              name: '推送规则设置',
              component: resolve => require(['../components/manage-delivery/childrens/rule.vue'], resolve)
            }
          ]
        },
        {
          path: '/system',
          name: '系统设置',
          component: resolve => require(['../components/manage-system/index.vue'], resolve),
          children: [
            {
              path: 'notice',
              name: '公告管理',
              component: resolve => require(['../components/manage-system/childrens/notice.vue'], resolve)
            },
            {
              path: 'user',
              name: '用户管理',
              component: resolve => require(['../components/manage-system/childrens/user.vue'], resolve)
            },
            {
              path: 'role',
              name: '角色管理',
              component: resolve => require(['../components/manage-system/childrens/role.vue'], resolve)
            },
            {
              path: 'staff',
              name: '员工排班管理',
              component: resolve => require(['../components/manage-system/childrens/staff.vue'], resolve)
            },
            {
              path: 'service',
              name: '客服管理',
              component: resolve => require(['../components/manage-system/childrens/service.vue'], resolve)
            },
            {
              path: 'app',
              name: 'APP版本管理',
              component: resolve => require(['../components/manage-system/childrens/app.vue'], resolve)
            }

          ]
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/include/Login.vue'], resolve)
    }
  ]
})
