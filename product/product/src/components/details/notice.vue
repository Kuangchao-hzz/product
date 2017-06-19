<template>
  <div class="order-details">
    <div class="details-title">
      公告详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row>
          <el-col :span="4">公告标题: </el-col>
          <el-col :span="16">系统升级</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">发送时间: </el-col>
          <el-col :span="16">2017/05/22 12:12:12</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">目标人群: </el-col>
          <el-col :span="16">所有人</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">公告内容: </el-col>
          <el-col :span="16">系统升级中...</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

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
      >.el-row{
        margin-top: 20px;
      }
    }
  }
</style>
