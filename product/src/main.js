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
import AMap from 'vue-amap'
import 'element-ui/lib/theme-default/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-awesome/icons'
/* eslint-disable no-duplicate-imports */
import { asyncRouterMap } from './router'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(common)
Vue.use(AMap)

AMap.initAMapApiLoader({
  key: '4f77fb55df2ea2d761581bf83ff57acc'
})
router.beforeEach((to, from, next) => {
  if (store.state.include.tableWidth === '' && store.state.include.tableHeight === '') {
    store.dispatch('captureBrowserSize').then(() => {
      if (store.state.select.treeCountry.length < 1) {
        store.dispatch('fetch_allAreaAndStore')
        next()
      } else {
        next()
      }
    })
  } else {
    next()
  }
  // if (to.path !== '/login') {
  //   if (Cookies.get('_token')) {
  //
  //   } else {
  //     next({
  //       path: '/login'
  //     })
  //   }
  // } else {
  //   next()
  // }
})

router.addRoutes(asyncRouterMap)

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
  components: { App }
})
