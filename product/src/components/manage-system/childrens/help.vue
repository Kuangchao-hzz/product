<template>
  <div class="system-editor">
    <div class="UE-edit" :id="diffEditId" type="text/plain"></div>
    <el-row style="text-align: center;margin-top: 15px;">
      <el-button @click="save_data">提交</el-button>
    </el-row>
  </div>
</template>

<script>
  import '../../../../static/ueditor/ueditor.config.js'
  import '../../../../static/ueditor/ueditor.all.js'
  import '../../../../static/ueditor/lang/zh-cn/zh-cn.js'
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        editor: null
      }
    },
    computed: {
      diffEditId () {
        return 'editor_' + Math.floor(Math.random() * 10000)
      }
    },
    mounted () {
      /* eslint-disable no-undef */
      this.editor = UE.getEditor(this.diffEditId)
      this.editor.addListener('ready', () => {
        this.fetch_data()
      })
    },
    methods: {
      editUpdata () {
        console.log(this.editor.getContent())
      },
      fetch_data () {
        apiTable.data_fetchUserHelp().then((response) => {
          this.editor.setContent(response.data.dat)
        })
      },
      save_data () {
        apiTable.edit_userHelpSave({
          useHelp: this.editor.getContent()
        }).then((response) => {
          this.$message('保存成功！')
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .system-editor{
    width: 100%;
    height: 80%;
    .UE-edit{
      height: 100%;
      .edui-editor{
        height: 100%;
        #edui1_iframeholder{
          height:530px !important;
        }
      }
    }
  }
</style>
