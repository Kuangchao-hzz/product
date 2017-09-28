<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="handlerResetPassword"
      size="tiny"
      :before-close="handleClose">
      <div class="login-reset-body">
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
    </el-dialog>
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
      handlerResetPassword () {
        if (this.$store.state.user.resetLogin) {
          this.$nextTick(() => {
            this.$refs.ruleForm.resetFields()
          })
          return true
        } else {
          return false
        }
      },
      handlerCodeValid () {
        return this.codeValid
      },
      handlerPasswordValid () {
        return this.passwordValid
      }
    },
    methods: {
      handleClose () {
        this.$store.dispatch('handlerPassword', false)
      },
      submitForm () {
        let self = this
        self.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            api.reset_password({
              pwd: md5(this.ruleForm.pwd),
              newPwd: md5(this.ruleForm.newPwd)
            }).then((response) => {
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

<style lang="scss" type="text/scss" scope>
  .login-reset-body{
    .login-wrap{
      width: 100% ;
      padding: 40px 0;
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
      .el-form-item__error{
        left: auto;
        right: 0;
        top: 11px;
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
