<template>
  <div class="login-body">
    <div class="login-wrap">
      <div class="ms-title">
        <img src="../../assets/img/logo.png">
      </div>
      <div class="ms-login">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="80px" class="demo-ruleForm">
          <el-form-item
            prop="pwd"
            label="原密码" class="last-form-item">
            <el-input type="password"
                      v-model="ruleForm.pwd"
                      auto-complete="off"
                      placeholder="原密码">
            </el-input>
          </el-form-item>
          <el-form-item
            prop="newPwd"
            label="新密码" class="last-form-item">
            <el-input type="password"
                      auto-complete="off"
                      v-model="ruleForm.newPwd"
                      placeholder="新密码">
            </el-input>
          </el-form-item>
          <el-form-item
            prop="checkPwd"
            label="密码确认" class="last-form-item">
            <el-input type="password"
                      auto-complete="off"
                      v-model="ruleForm.checkPwd"
                      placeholder="密码确认">
            </el-input>
          </el-form-item>
          </el-row>
          <div class="login-btn" style="margin-top: 15px">
            <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
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
          pwd: '',
          newPwd: '',
          checkPwd: ''
        },
        rules: {
          pwd: [
            {
              required: true,
              message: '请输入原密码',
              trigger: 'blur'
            }
          ],
          newPwd: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'))
                } else {
                  if (this.ruleForm.checkPwd !== '') {
                    this.$refs.ruleForm.validateField('checkPwd')
                  }
                  callback()
                }
              }
            }
          ],
          checkPwd: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.newPwd) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              }
            }
          ]
        }
      }
    },
    computed: {
      handlerCodeValid () {
        return this.codeValid
      },
      handlerPasswordValid () {
        return this.passwordValid
      }
    },
    methods: {
      submitForm () {
        let self = this
        self.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            api.reset_password({
              pwd: md5(this.ruleForm.pwd),
              newPwd: md5(this.ruleForm.newPwd)
            }).then((response) => {
              console.log(self.ruleForm)
              if (response.data.code === 1) {
                self.$router.push('/login')
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
  .login-body{
    width: 100%;
    height: 100%;
    background: #ddd;
    .el-form-item__error{
      left: auto;
      right: 20px;
      top: 25%;
    }
    .login-wrap{
      width:400px;
      padding: 40px 0;
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
        .el-input-group__prepend,.el-input__inner{
          border-radius: 0;
          height: 36px;
          border: 0;
          background: transparent;
        }
        .login-btn{
          text-align: center;
        }
        .login-btn button{
          width:50%;
          height:36px;
          border-radius: 0;
          background: #0000cc;
        }
        .el-form-item{
          margin-bottom: 0;
          border-bottom: 1px #ddd solid;
        }
      }
      .verification-code{
        .el-col-8{
          line-height: 36px;
          border-top: 1px #ddd solid;
          border-left: 1px #ddd solid;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
</style>
