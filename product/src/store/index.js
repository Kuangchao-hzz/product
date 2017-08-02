import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import select from './modules/select'
import include from './modules/include'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    include,
    select
  },
  getters
})

export default store
