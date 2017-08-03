
const include = {
  state: {
    tableWidth: '',
    tableHeight: '',
    sidebarWidth: 240,
    areaAndStore: {}
  },
  mutations: {
    SET_INNERWIDTH ($state, $width) {
      $state.tableWidth = $width
    },
    SET_INNERHEIGHT ($state, $height) {
      $state.tableHeight = $height
    },
    SET_SIDEBARWIDTH ($state, $width) {
      $state.sidebarWidth = $width
    }
  },
  actions: {
    captureBrowserSize ({ commit }, sideBarSize = 240) {
      return new Promise(resolve => {
        let innerWidth = window.innerWidth
        let innerHeight = window.innerHeight
        commit('SET_INNERWIDTH', innerWidth)
        commit('SET_INNERHEIGHT', innerHeight)
        commit('SET_SIDEBARWIDTH', sideBarSize)
        resolve()
      })
    }
  }
}
export default include
