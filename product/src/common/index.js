import demo from './echart/demo.vue'

const install = function (Vue, config = {}) {
  Vue.component(demo.demo, demo)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  demo
}
