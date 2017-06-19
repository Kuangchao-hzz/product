import demo from './echart/demo.vue'
import caledar from './caledar/caledar.vue'

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(demo.name, demo)
  Vue.component(caledar.name, caledar)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
