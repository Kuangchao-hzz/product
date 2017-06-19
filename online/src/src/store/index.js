import Vue from 'vue'
import Vuex from 'vuex'
import select from './modules/select'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    select
  }
})

export default store
