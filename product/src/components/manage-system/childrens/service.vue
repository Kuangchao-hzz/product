<template>
  <div class="view-service">
    <el-form ref="form" :model="serviceForm" label-width="80px">
      <el-form-item label="客服热线">
        <el-input v-model="serviceForm.kefu"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit_data">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        serviceForm: {
          kefu: ''
        }
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      data_table () {
        let self = this
        apiTable.data_editService().then((response) => {
          if (response.data.code === 1) {
            self.serviceForm.kefu = response.data.dat
          } else {
            swal(response.data.msg)
          }
        })
      },
      submit_data () {
        let self = this
        apiTable.edit_editService({
          kufu: self.serviceForm.kefu
        }).then((response) => {
          if (response.data.code === 1) {
            swal('保存成功！')
            self.data_table()
          } else {
            swal(response.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-service{
    form{
      width: 300px;
    }
  }
</style>
