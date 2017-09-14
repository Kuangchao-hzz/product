<template>
  <div class="order-details">
    <div class="details-title">
      公告详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row>
          <el-col :span="2" style="width: 80px">公告标题:</el-col>
          <el-col :span="16">{{detailsData.title}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="width: 80px">发送时间:</el-col>
          <el-col :span="16">{{detailsData.pubTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="width: 80px">目标人群:</el-col>
          <el-col :span="16">
            {{detailsData.type === 0? '所有人':''}}
            {{detailsData.type === 1? '员工':''}}
            {{detailsData.type === 2? '社会人':''}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" style="width: 80px">公告内容:</el-col>
          <el-col :span="16">{{detailsData.content}}</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        detailsData: {}
      }
    },
    methods: {

    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.detailsData = JSON.parse(localStorage.getItem('details_notice'))
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .order-details {
    color: #666;

  .details-title {
    border-bottom: 1px #ddd solid;
    padding: 10px;
    font-size: 24px;
  }

  .content-body {

  >
  .el-row {
    margin-top: 20px;
  }

  }
  }
</style>
