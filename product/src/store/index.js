import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import select from './modules/select'
import include from './modules/include'
import order from './modules/order'
import getters from './getters'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    include,
    order,
    permission,
    select
  },
  getters
})

export default store
