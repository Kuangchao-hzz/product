// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './api/index'
import common from './common/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import AMap from 'vue-amap'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(common)
Vue.use(AMap)

AMap.initAMapApiLoader({
  key: '4f77fb55df2ea2d761581bf83ff57acc'
})
Vue.component('icon', Icon)
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
