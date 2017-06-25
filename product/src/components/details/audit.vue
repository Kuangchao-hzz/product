<template>
  <div class="order-details">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" class="base-info">
            <el-row class="data-item">
              <el-col :span="4">姓名：</el-col>
              <el-col :span="6">张三</el-col>
              <el-col :span="6">联系方式：</el-col>
              <el-col :span="6">13918181818</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">类别：</el-col>
              <el-col :span="6">员工</el-col>
              <el-col :span="6">工号：</el-col>
              <el-col :span="6">00001</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">性别：</el-col>
              <el-col :span="6">男</el-col>
              <el-col :span="6">年龄：</el-col>
              <el-col :span="6">27</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">常驻地区：</el-col>
              <el-col :span="6">上海-上海-普陀区</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">设备型号：</el-col>
              <el-col :span="6">苹果</el-col>
              <el-col :span="4">注册时间：</el-col>
              <el-col :span="6">2017/05/22 15:00:00</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">工作年限：</el-col>
              <el-col :span="6">1年</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">注册ip：</el-col>
              <el-col :span="6">123.123.123.123</el-col>
              <el-col :span="6">ip地区：</el-col>
              <el-col :span="6">上海</el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="4">身份证：</el-col>
              <el-col :span="6"><a href="javascript:" @click="passwordDialog.windowStatus = true">显示身份证</a></el-col>
            </el-row>
            <el-row class="data-item">
              <el-col :span="5">
                <el-button type="info" @click="outOrderDialog = true">审核通过</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="info" @click="closeOrderDialog = true">审核不通过</el-button>
              </el-col>
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
      <el-form :model="passwordDialog" label-width="80px" class="demo-form-inline">
        <el-form-item label="密码：">
          <el-input v-model="passwordDialog.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="passwordDialog.windowStatus = false">关闭</el-button>
      </el-form-item>
      </el-form
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        passwordDialog: {
          windowStatus: false,
          password: ''
        },
        searchData: {
          category: '',
          personLevel: '',
          workStatus: '',
          accountStatus: '',
          personName: '',
          personMobile: ''
        },
        tableData: [{
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          name1: '普通',
          address1: '上海-新村门店',
          date2: '201705220001'
        }, {
          date: '201705220001',
          name: '普通',
          address: '上海-新村门店',
          date1: '201705220001',
          name1: '普通',
          address1: '上海-新村门店',
          date2: '201705220001'
        }]
      }
    },
    methods: {
      submitForm () {
        alert(JSON.stringify(this.searchData))
      },
      onSubmit () {
        console.log('submit!')
        this.passwordDialog.windowStatus = false
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .order-details{
    color: #666;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 24px;
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
            .el-button{
              width: 100%;
            }
          }
        }

      }
    }
  }
</style>
