<template>
  <div class="view-notice">
    <div class="notice-group">
      <el-button :disabled="!btn_auth('b_gg_fbgg')" @click="createDialogForm.isShow = true">发布公告</el-button>
    </div>
    <div class="system-notice-table">
      <el-table
        :height="tabHeight"
        :max-height="tabHeight"
        ref="multipleTable"
        :data="tableData.details"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          :show-overflow-tooltip=true
          label="内容">
        </el-table-column>
        <el-table-column
          align="center"
          label="目标人群"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.type === 0? '所有人':''}}
            {{scope.row.type === 1? '员工':''}}
            {{scope.row.type === 2? '社会人':''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pubTime"
          align="center"
          label="发送时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template scope="scope"
                    align="center">
            <el-button type="text"
                       size="small"
                       @click="localStorage_details(scope.row)">查看详情</el-button>
            <el-button type="text"
                       size="small"
                       :disabled="!btn_auth('b_gg_cxts')"
                       @click="again_push(scope.row)">重新推送</el-button>
            <el-button type="text"
                       size="small"
                       :disabled="!btn_auth('b_gg_sc')"
                       @click="delete_push(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="system-notice-pagination">
      <el-pagination
        @current-change="data_table"
        :page-sizes="[20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.rowsCount">
      </el-pagination>
    </div>
    <el-dialog
      title="发布公告"
      :visible.sync="createDialogForm.isShow"
      size="small"
      :before-close="handleClose">
      <el-form
        ref="createDialogForm"
        :model="createDialogForm"
        label-width="100px">
        <el-form-item label="公告标题: "
                      prop="title"
                      :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
          <el-input v-model="createDialogForm.title"></el-input>
        </el-form-item>
        <el-form-item label="目标人群">
          <el-radio-group v-model="createDialogForm.type">
            <el-radio :label="0">所有人</el-radio>
            <el-radio :label="1">员工</el-radio>
            <el-radio :label="2">社会人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公告内容"
                      prop="content"
                      :rules="{required: true, message: '公告内容不能为空', trigger: 'blur'}">
          <el-input type="textarea" v-model="createDialogForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_tableData">确定</el-button>
          <el-button @click="createDialogForm.isShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        createDialogForm: {
          isShow: false,
          type: 0,
          title: '',
          content: ''
        },
        tableData: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      again_push ($row) {
        swal({
          title: '你确定要重新推送?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          apiDetails.again_push({
            id: $row.id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message('操作成功！')
              this.data_table()
            }
          })
        }, () => {

        })
      },
      delete_push ($row) {
        swal({
          title: '你确定要删除?',
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          apiDetails.delete_push({
            id: $row.id
          }).then((response) => {
            if (response.data.code === 1) {
              this.$message('操作成功！')
              this.data_table()
            }
          })
        }, () => {

        })
      },
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      localStorage_details ($item) {
        this.$router.push('/system/noticeDetails')
        localStorage.setItem('details_notice', JSON.stringify($item))
      },
      data_table ($page) {
        let self = this
        apiTable.data_noticeTable({
          page: $page - 1 || 0
        }).then((response) => {
          self.tableData = response.data.dat
        })
      },
      add_tableData () {
        this.$refs['createDialogForm'].validate((valid) => {
          if (valid) {
            apiTable.edit_systemNoticeTable({
              type: this.createDialogForm.type,
              title: this.createDialogForm.title,
              content: this.createDialogForm.content
            }).then(() => {
              this.$message({
                duration: 1500,
                message: '发布成功！'
              })
              this.createDialogForm.isShow = false
              this.data_table()
            })
          } else {
            return false
          }
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-notice {

  .notice-group {
    margin-bottom: 20px;
  }

  .system-notice-table {
    margin-bottom: 20px;
  }

  .system-notice-pagination {
    text-align: right;
  }

  }
</style>
