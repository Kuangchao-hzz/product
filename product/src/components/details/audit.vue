<template>
  <div class="audit-details">
    <div class="details-title">
      审核详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="3"><strong>姓名：</strong></el-col>
              <el-col :span="6">{{detailsData.realName}}</el-col>
              <el-col :span="3"><strong>联系方式：</strong></el-col>
              <el-col :span="6">{{detailsData.phone}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>类别：</strong></el-col>
              <el-col :span="6">
                {{ detailsData.userType == '1'? '员工' : '' }}
                {{ detailsData.userType == '2'? '社会' : '' }}
              </el-col>
              <el-col :span="3"><strong>工号：</strong></el-col>
              <el-col :span="6">{{detailsData.employeeId?detailsData.employeeId:'- -'}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>性别：</strong></el-col>
              <el-col :span="6">{{}}</el-col>
              <el-col :span="3"><strong>年龄：</strong></el-col>
              <el-col :span="6">{{}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>常驻地区：</strong></el-col>
              <el-col :span="6">{{detailsData.district}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>设备型号：</strong></el-col>
              <el-col :span="6">{{}}</el-col>
              <el-col :span="3"><strong>注册时间：</strong></el-col>
              <el-col :span="6">{{detailsData.regTime}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>注册ip：</strong></el-col>
              <el-col :span="6">{{detailsData.regIp}}</el-col>
              <el-col :span="3"><strong>ip地区：</strong></el-col>
              <el-col :span="6">{{detailsData.ip}}</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="3"><strong>身份证：</strong></el-col>
              <el-col :span="6"><a href="javascript:" @click="passwordDialog.windowStatus = true">显示身份证</a></el-col>
            </el-row>
            <el-row :gutter="10" class="data-item">

              <el-button type="info" @click="details_submit(1)">审核通过</el-button>
              <el-button type="info" @click="details_submit(2)">审核不通过</el-button>
              <el-button type="info" @click="back">返回</el-button>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 验证密码查看身份证 -->
    <el-dialog
      title="请输入密码"
      :visible.sync="passwordDialog.windowStatus"
      size="tiny"
      :before-close="handleClose">
      <el-form :model="passwordDialog"
               ref="passwordDialog"
               :rules="rules"
               label-width="80px"
               class="demo-form-inline">
        <el-form-item label="密码："
                      prop="password">
          <el-input type="password" v-model="passwordDialog.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="身份证："
                      v-if="idCarUrlHandle !== ''"
                      class="idCar-box">
          <img :src="idCarUrlHandle" :onerror="errorImg">
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="viewIdCard">查看</el-button>
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </el-form-item>
      </el-form>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDetails from '@/api/details'
  const qs = require('qs')
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        detailsData: {},
        idCarUrl: '',
        errorImg: 'this.title="错误的图片"',
        passwordDialog: {
          windowStatus: false,
          password: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      idCarUrlHandle () {
        return this.idCarUrl
      }
    },
    mounted () {

    },
    methods: {
      viewIdCard () {
        this.$refs['passwordDialog'].validate((valid) => {
          if (valid) {
            this.idCarUrl = '/api/web/deliveryUserManage/viewIdCard?' + qs.stringify({
              imgId: this.detailsData.idCardImg,
              pwd: md5(this.passwordDialog.password)
            })
          } else {
            return false
          }
        })
      },
      back () {
        this.$router.push('/person/audit')
      },
      details_submit ($params) {
        apiDetails.details_submitAudit({
          id: this.detailsData.id,
          result: $params
        }).then((response) => {
          this.$message(response.data.msg)
          this.$router.push('/person/audit')
          localStorage.removeItem('details_audit')
        })
      },
      handleClose (done) {
        this.passwordDialog.windowStatus = false
        this.passwordDialog.password = ''
        this.idCarUrl = ''
        this.$refs['passwordDialog'].resetFields()
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.detailsData = JSON.parse(localStorage.getItem('details_audit'))
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .audit-details{
    color: #666;
    font-size: 12px;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 18px;
    }
    .content-body{
      padding: 20px 0;
      .base-info{
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 20px;
      }
      .data-item{
        >.el-col{
          padding: 10px 0;
          .check-item-row{
            padding-bottom: 20px;
            &.total-row{
              border-top: 1px #666 solid;
              padding-top: 20px;
            }
          }
        }
      }
    }
    .el-dialog{
      width: 500px;
    }
    .idCar-box{
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
