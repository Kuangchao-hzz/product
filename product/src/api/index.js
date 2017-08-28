import Vue from 'vue'
import axios from 'axios'
import router from '../router'
const qs = require('qs')

// 更过axios参考配置 http://www.jianshu.com/p/df464b26ae58
const instance = axios.create({
  baseURL: '/api',
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})

instance.interceptors.response.use((res) => {
  if (res.data.code === -100) {
    router.push('/login')
  } else if (res.data.code !== 1) {
    Vue.prototype.$message({
      showClose: true,
      message: res.data.msg,
      type: 'error'
    })
  } else {
    return res
  }
}, (res) => {
  return res
})

instance.interceptors.request.use((res) => {
  return res
}, () => {

})

export default instance

export const instanceJson = axios.create({
  baseURL: '/api'
})

instanceJson.interceptors.response.use((res) => {
  if (res.data.code !== 1) {
    Vue.prototype.$message({
      showClose: true,
      message: res.data.msg,
      type: 'error'
    })
  } else {
    return res
  }
})
