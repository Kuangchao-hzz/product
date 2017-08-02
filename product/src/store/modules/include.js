
const include = {
  state: {
    tableWidth: '',
    tableHeight: '',
    areaAndStore: {}
  },
  mutations: {
    SET_INNERWIDTH ($state, $width) {
      $state.tableWidth = $width
    },
    SET_INNERHEIGHT ($state, $height) {
      $state.tableHeight = $height
    }
  },
  actions: {
    captureBrowserSize ({ commit }) {
      return new Promise(resolve => {
        let innerWidth = window.innerWidth
        let innerHeight = window.innerHeight
        commit('SET_INNERHEIGHT', innerWidth)
        commit('SET_INNERHEIGHT', innerHeight)
        resolve()
      })
    }
  }
}
export default include
