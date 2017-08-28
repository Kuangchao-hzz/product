export default {
  state: {
    sendOrder: false,
    pushOrder: false,
    abnormalOrder: false,
    allOrder: false
  },
  mutations: {
    SET_SENDORDER ($state, $status) {
      $state.sendOrder = $status
    },
    SET_PUSHORDER ($state, $status) {
      $state.pushOrder = $status
    },
    SET_ABNORMALORDER ($state, $status) {
      $state.abnormalOrder = $status
    },
    SET_ALLORDER ($state, $status) {
      $state.allOrder = $status
    }
  },
  actions: {
    set_sendOrder ({ commit }, $status) {
      commit('SET_SENDORDER', $status)
    },
    set_pushOrder ({ commit }, $status) {
      commit('SET_PUSHORDER', $status)
    },
    set_abnormalOrder ({ commit }, $status) {
      commit('SET_ABNORMALORDER', $status)
    },
    set_allOrder ({ commit }, $status) {
      commit('SET_ALLORDER', $status)
    }
  }
}
