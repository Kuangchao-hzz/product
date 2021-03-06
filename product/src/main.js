// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './api/index'
import common from './common/index'
import ElementUI from 'element-ui'
/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2'
import Icon from 'vue-awesome/components/Icon'
import 'element-ui/lib/theme-default/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-awesome/icons'
/* eslint-disable no-duplicate-imports */
import {asyncRouterMap} from './router'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(common)

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/forget' && to.path !== '/resetPassword') {
    if (store.state.select.treeCountry.length < 1) {
      store.dispatch('fetch_allAreaAndStore')
    }
    // store.dispatch('setSidebarStatus', false)
    // store.dispatch('captureBrowserSize', 240)
    // 如果当前地址不是登录页 并且没有路由权限 则跳转到登录页
    if (!localStorage.getItem('ms_authId') || store.getters.authIds === 'null') {
      next({path: '/login'})
    } else {
      // 当地址不是登录页 但是有路由权限 则生成路由表
      store.dispatch('get_authIds').then(() => {
        if (store.getters.addRouters.length < 1) {
          // 将路由字段转成数组
          let roles = store.getters.authIds.split(',')
          // 生成路由表 并添加到router实例里面
          store.dispatch('GenerateRoutes', {roles}).then(() => {
            var routerJSON = JSON.parse(JSON.stringify(store.getters.addRouters))
            if (routerJSON) {
              router.addRoutes(asyncRouterMap)
              router.addRoutes(routerJSON)
              next({...to})
            }
            // 获取浏览器尺寸 计算布局
            if (store.state.include.tableWidth === '' && store.state.include.tableHeight === '') {
              store.dispatch('captureBrowserSize')
            }
          })
        } else {
          next()
        }
      })
    }
  } else {
    localStorage.setItem('ms_authId', null)
    store.dispatch('ResetCurrentRouter')
    store.dispatch('reset_allAreaAndStore')
    store.dispatch('handlerLoginInfo')
    // 跳转到登录页是 重置路由表
    next()
  }
})

Vue.component('icon', Icon)

// webpack 有global关键字 定义全局变量
global.swal = Swal

/* eslint-disable no-new */
new Vue({
  el: '#app',
  charts: [],
  store,
  router,
  axios,
  template: '<App/>',
  components: {App}
})
