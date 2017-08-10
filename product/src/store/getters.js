
const getters = {
  token: state => state.user.tokenm,
  authIds: state => state.user.AUTHIDS,
  addRouters: state => state.permission.addRouters
}
export default getters
