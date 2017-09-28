<template>
  <div class="login-forget-body">
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
            prop="uname"
            label="工号">
            <el-input v-model="ruleForm.uname" placeholder="工号"></el-input>
          </el-form-item>
          <el-form-item
            prop="phone"
            label="手机号">
            <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-row class="verification-code">
            <el-col :span="16">
              <el-form-item
                prop="code"
                label="验证码">
                <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <countdown :start='start' @countDown ='start=false' @click.native='sendCode'></countdown>
            </el-col>
          </el-row>
          <el-form-item
            prop="password"
            label="新密码" class="last-form-item">
            <el-input type="password"
                      v-model="ruleForm.password"
                      @keyup.enter.native="submitForm('ruleForm')"
                      placeholder="新密码">
            </el-input>
          </el-form-item>
          </el-row>
          <div class="login-btn" style="margin-top: 15px">
            <el-button type="primary" @click="goBack()">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/login'
  import md5 from 'js-md5'
  import countdown from '@/common/countdown'
  // let Base64 = require('js-base64').Base64
  export default {
    data: function () {
      return {
        start: false,
        codeValid: false,
        passwordValid: false,
        ruleForm: {
          uname: '',
          phone: '',
          code: '',
          password: ''
        },
        rules: {
          uname: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          code: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.handlerCodeValid) {
                  if (!value) {
                    return callback(new Error('请输入验证码'))
                  }
                }
                callback()
              }
            }
          ],
          password: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.handlerPasswordValid) {
                  if (!value) {
                    return callback(new Error('请输入新密码'))
                  }
                }
                callback()
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
    mounted () {
    },
    methods: {
      goBack () {
        this.$router.push('/login')
      },
      sendCode (value) {
        // 前面发送ajax请求成功之后调用this.start = true开始短信倒计时
        this.codeValid = false
        this.passwordValid = false
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            api.send_code({
              phone: this.ruleForm.phone,
              employeeId: this.ruleForm.uname
            }).then((response) => {
              if (response.data.code === 1) {
                this.start = true
                this.codeValid = true
                this.passwordValid = true
              }
            })
          } else {
            return false
          }
        })
      },
      submitForm () {
        let self = this
        self.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            api.editNew_password({
              uname: this.ruleForm.uname,
              phone: this.ruleForm.phone,
              code: this.ruleForm.code,
              password: md5(this.ruleForm.password)
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
    },
    components: {
      countdown
    }
  }
</script>

<style lang="scss" type="text/scss">
  .login-forget-body{
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
          width:120px;
          height:36px;
          border-radius: 0;
          background: #0000cc;
        }
        .el-form-item{
          margin-bottom: 0;
          .el-form-item__content{
            border-top: 1px #ddd solid;
          }
          .el-form-item__label{
            border-top: 1px #ddd solid;
            &:before{
              content: '';
            }
          }
          &.last-form-item{
            .el-form-item__content{
              border-bottom: 1px #ddd solid;
            }
            .el-form-item__label{
              border-bottom: 1px #ddd solid;
            }
          }
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
