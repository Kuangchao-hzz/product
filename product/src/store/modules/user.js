import Cookies from 'js-cookie'

const user = {
  state: {
    USERID: Cookies.get('USERID'),
    POSSWORD: Cookies.get('POSSWORD'),
    LOGINSTATUS: Cookies.get('LOGINSTATUS'),
    TOKEN: Cookies.get('_token')
  },
  mutations: {
    SET_USERID: (state, user) => {
      state.USERID = user
    },
    SET_TOKEN: (state, token) => {
      state.TOKEN = token
    },
    SET_POSSWORD: (state, password) => {
      state.POSSWORD = password
    },
    SET_LOGINSTATUS: (state, password) => {
      state.LOGINSTATUS = password
    }
  },
  actions: {
    LoginByUser ({ commit }, userInfo) {
      return new Promise(resolve => {
        const user = userInfo.username.trim()
        const password = userInfo.password.trim()
        console.log(Cookies.get('USERID'))
        console.log(Cookies.get('_token'))
        commit('SET_TOKEN', Cookies.get('_token'))
        if (userInfo.checked) {
          Cookies.set('USERID', user)
          Cookies.set('POSSWORD', password)
          Cookies.set('LOGINSTATUS', userInfo.checked)
          commit('SET_USERID', user)
          commit('SET_POSSWORD', password)
          commit('SET_LOGINSTATUS', userInfo.checked)
        } else {
          Cookies.remove('USERID')
          Cookies.remove('POSSWORD')
          commit('SET_LOGINSTATUS', userInfo.checked)
        }
        resolve()
      })
    }
  }
}

export default user
