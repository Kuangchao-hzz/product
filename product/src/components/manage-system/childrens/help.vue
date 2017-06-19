<template>
  <div class="system-editor">
    <div id="editor" type="text/plain"></div>
    <el-button @click="editUpdata">提交</el-button>
  </div>
</template>

<script>
  import '../../../../static/ueditor/ueditor.config.js'
  import '../../../../static/ueditor/ueditor.all.js'
  import '../../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    data () {
      return {
        editor: null
      }
    },
    mounted () {
      /* eslint-disable no-undef */
      this.editor = UE.getEditor('editor')
    },
    methods: {
      editUpdata () {
        console.log(this.editor.getContent())
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .system-editor{
    width: 100%;
    height: 700px;
    #editor{
      width: 990px;
      height: 650px;
      #edui1_iframeholder{
        height:530px !important;
      }
    }
  }
</style>
