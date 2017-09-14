<template>
  <div class="forget-body">
    <div class="login-wrap">
      <div class="ms-title">
        <img src="../../assets/img/logo.png">
      </div>
      <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="手机号/邮箱">
              <template slot="prepend">
                <img src="../../assets/img/user.png">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      v-model="ruleForm.password"
                      @keyup.enter.native="submitForm('ruleForm')"
                      placeholder="密码">
              <template slot="prepend">
                <img src="../../assets/img/password.png">
              </template>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <el-checkbox v-model="ruleForm.checked">记住登录状态</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item style="text-align: right">
                <router-link to="/forget">忘记密码?</router-link>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/login'
  import md5 from 'js-md5'
  // let Base64 = require('js-base64').Base64
  export default {
    data: function () {
      return {
        ruleForm: {
          username: this.$store.state.user.USERID,
          password: this.$store.state.user.POSSWORD,
          /* eslint-disable no-unneeded-ternary */
          checked: this.$store.getters.loginStatus
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {

    },
    mounted () {
      if (!this.$store.state.user.LOGINSTATUS) {
        this.ruleForm.username = ''
        this.ruleForm.password = ''
      }
    },
    methods: {
      submitForm (formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            api.login_user({
              uname: self.ruleForm.username,
              pwd: md5(self.ruleForm.password)
            }).then((response) => {
              if (response.data.code === 1) {
                localStorage.setItem('ms_username', self.ruleForm.username)
                localStorage.setItem('ms_userId', response.data.dat.id)
                localStorage.setItem('ms_authId', response.data.dat.authIds)
                localStorage.setItem('ms_loginInfo', this.ruleForm.checked ? 1 : 0)
                self.$store.dispatch('get_authIds')
                self.$store.dispatch('LoginByUser', self.ruleForm).then(() => {
                  self.$router.push('/data/delivery')
                })
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .forget-body{
    width: 100%;
    height: 100%;
    background: #ddd;
    .login-wrap{
      width:300px;
      padding: 40px;
      background: #fff;
      box-shadow: 0 0 20px rgba(0,0,0,.3);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .ms-title{
        text-align: center;
        font-size:30px;
        color: #666;
        margin-bottom: 20px;
      }
      .ms-login{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        .el-input{
          border-bottom: 1px solid #bfcbd9;
        }
        .el-input-group__prepend,.el-input__inner{
          border-radius: 0;
          border: none;
          border-bottom: none;
          height: 46px;
          background: transparent;
        }
        .login-btn{
          text-align: center;
        }
        .login-btn button{
          width:100%;
          height:36px;
          border-radius: 0;
          background: #0000cc;
        }
      }
    }
  }
</style>
