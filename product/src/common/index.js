import demo from './echart/demo.vue'

const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.component(demo.name, demo)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  demo,
  countrySelect
}
