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
          component: resolve => require(['../components/manage-data/index.vue'], resolve),
          children: [
            {
              path: 'delivery',
              component: resolve => require(['../components/manage-data/childrens/delivery.vue'], resolve)
            },
            {
              path: 'people',
              component: resolve => require(['../components/manage-data/childrens/people.vue'], resolve)
            }
          ]
        },
        {
          path: '/order',
          component: resolve => require(['../components/manage-order/index.vue'], resolve),
          children: [
            {
              path: 'waitSendOrder',
              component: resolve => require(['../components/manage-order/childrens/waitSendOrder.vue'], resolve)
            },
            {
              path: 'waitPushOrder',
              component: resolve => require(['../components/manage-order/childrens/waitPushOrder.vue'], resolve)
            },
            {
              path: 'abnormalOrder',
              component: resolve => require(['../components/manage-order/childrens/abnormalOrder.vue'], resolve)
            },
            {
              path: 'allOrder',
              component: resolve => require(['../components/manage-order/childrens/allOrder.vue'], resolve)
            }
          ]
        },
        {
          path: '/person',
          component: resolve => require(['../components/manage-person/index.vue'], resolve),
          children: [
            {
              path: 'map',
              component: resolve => require(['../components/manage-person/childrens/map.vue'], resolve)
            },
            {
              path: 'manage',
              component: resolve => require(['../components/manage-person/childrens/manage.vue'], resolve)
            },
            {
              path: 'audit',
              component: resolve => require(['../components/manage-person/childrens/audit.vue'], resolve)
            },
            {
              path: 'money',
              component: resolve => require(['../components/manage-person/childrens/money.vue'], resolve)
            }
          ]
        },
        {
          path: '/delivery',
          component: resolve => require(['../components/manage-delivery/index.vue'], resolve),
          children: [
            {
              path: 'store',
              component: resolve => require(['../components/manage-delivery/childrens/store.vue'], resolve)
            },
            {
              path: 'money',
              component: resolve => require(['../components/manage-delivery/childrens/money.vue'], resolve)
            },
            {
              path: 'level',
              component: resolve => require(['../components/manage-delivery/childrens/level.vue'], resolve)
            },
            {
              path: 'rule',
              component: resolve => require(['../components/manage-delivery/childrens/rule.vue'], resolve)
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
