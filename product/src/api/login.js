import instance from './index'

export default {
  // 登录
  login_user ($baseData) {
    return instance.post('/web/user/login', $baseData)
  },
  // 退出
  logout_user ($baseData) {
    return instance.post('/web/user/logout', $baseData)
  },
  // 保存新密码
  editNew_password ($baseData) {
    return instance.post('/web/user/resetPwd', $baseData)
  },
  // 验证码
  send_code ($baseData) {
    return instance.get('/web/commData/sendCode', {
      params: $baseData
    })
  }
}
