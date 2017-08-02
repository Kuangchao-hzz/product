<template>
  <div class="export-data-component">
    <el-dialog
      title="导入数据"
      :visible.sync="exportDataIsShow">

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        exportDataIsShow: false
      }
    },
    methods: {
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  };
</script>

<style lang="scss" type="text/scss">

</style>
