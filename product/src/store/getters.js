
const getters = {
  token: state => state.user.token,
  authIds: state => state.user.AUTHIDS,
  addRouters: state => state.permission.addRouters,
  sendOrderStatus: state => state.order.sendOrder,
  pushOrderStatus: state => state.order.pushOrder,
  abnormalOrderStatus: state => state.order.abnormalOrder,
  allOrderStatus: state => state.order.allOrder
}
export default getters
