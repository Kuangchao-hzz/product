import demo from './echart/demo.vue'
import barcode from './barcode/barcode.vue'

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(demo.name, demo)
  Vue.component(barcode.name, barcode)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
