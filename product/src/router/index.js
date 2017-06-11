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
          component: resolve => require(['../components/data-manage/index.vue'], resolve),
          children: [
            {
              path: 'delivery',
              component: resolve => require(['../components/data-manage/childrens/delivery.vue'], resolve)
            },
            {
              path: 'people',
              component: resolve => require(['../components/data-manage/childrens/people.vue'], resolve)
            }
          ]
        },
        {
          path: '/order',
          component: resolve => require(['../components/order-manage/index.vue'], resolve),
          children: [
            {
              path: 'waitSendOrder',
              component: resolve => require(['../components/order-manage/childrens/waitSendOrder.vue'], resolve)
            },
            {
              path: 'waitPushOrder',
              component: resolve => require(['../components/order-manage/childrens/waitPushOrder.vue'], resolve)
            },
            {
              path: 'abnormalOrder',
              component: resolve => require(['../components/order-manage/childrens/abnormalOrder.vue'], resolve)
            },
            {
              path: 'allOrder',
              component: resolve => require(['../components/order-manage/childrens/allOrder.vue'], resolve)
            }
          ]
        },
        {
          path: '/person',
          component: resolve => require(['../components/person-manage/index.vue'], resolve),
          children: [
            {
              path: 'map',
              component: resolve => require(['../components/person-manage/childrens/map.vue'], resolve)
            },
            {
              path: 'manage',
              component: resolve => require(['../components/person-manage/childrens/manage.vue'], resolve)
            },
            {
              path: 'audit',
              component: resolve => require(['../components/person-manage/childrens/audit.vue'], resolve)
            },
            {
              path: 'money',
              component: resolve => require(['../components/person-manage/childrens/money.vue'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/pages/Login.vue'], resolve)
    }
  ]
})
