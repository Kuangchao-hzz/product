<template>
  <div class="view-role">
    <div class="role-group">
      <el-button @click="createDialogForm.type = true">新增用户</el-button>
    </div>
    <div class="system-role-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="操作权限">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="createDialogForm.type"
      size="small"
      :modal="false"
      :before-close="handleClose">
      <el-form
        :model="createDialogForm"
        label-width="80px">
        <el-form-item label="角色名称: ">
          <el-input v-model="createDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="操作权限: ">
          <el-tree
            :data="createDialogForm.routerAuth"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="createDialogForm.type = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          order: '48911891891',
          orderTime: '20170302',
          money: '￥1564',
          person: '007',
          mobile: '187*******',
          category: '已结算',
          level: '二级',
          place: '上海市-宝山区',
          moneyMethod: '已结算'
        }],
        createDialogForm: {
          type: false,
          name: '',
          routerAuth: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
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
  }
</script>

<style lang="scss" type="text/scss">
  .view-role{
    .role-group{
      margin-bottom: 20px;
    }
  }
</style>
