<template>
  <div class="order-details">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="base-info">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="地区:">
                    <el-input value="上海-上海-普陀区" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="门店号:">
                    <el-input value="0001" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="门店名称:">
                    <el-input value="新村门店" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item label="地址:">
                    <el-input value="上海市普陀区新村路1500号1层" class="reset-border" readonly></el-input>
                    <div class="person-map">我是地图</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="联系人:">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系方式:">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注:">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
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
        .person-map{
          width: 400px;
          height: 200px;
          border: 1px #ddd solid;
          border-radius: 5px;
          margin: 3px 10px;
        }
      }
    }
  }
</style>
