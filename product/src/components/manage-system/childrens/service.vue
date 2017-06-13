<template>
  <div class="view-service">
    <el-form ref="form" :model="serviceForm" label-width="80px">
      <el-form-item label="客服热线">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        serviceForm: {
          service: ''
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
  .view-service{
    form{
      width: 300px;
      label{
        color: #fff !important;
      }
    }
  }
</style>
