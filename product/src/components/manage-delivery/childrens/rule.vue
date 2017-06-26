<template>
  <div class="delivery-rule">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="类别">
        <template scope="scope">
          <el-input v-show="scope.row.editable" size="small" v-model="scope.row.orderType"></el-input>
          <span v-show="!scope.row.editable">{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="推送距离(KM)">
        <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="scope.row.distance"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.distance?scope.row.distance: '- -'}}</span>
          </template>
      </el-table-column>
      <el-table-column
        label="优先级">
        <el-table-column
          label="员工(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="scope.row.config.sh"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.sh}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="三方物流(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="scope.row.config.wl"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.wl}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="社会(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="scope.row.config.yg"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.yg}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template scope="scope">
            <el-button v-if='!scope.row.editable' type="primary" @click='scope.row.editable=1' size="small" icon="edit">编辑</el-button>
            <el-button v-if='scope.row.editable' type="success" @click='scope.row.editable=0, inlineEditRow(scope.row)' size="small" icon="check">完成</el-button>
            <el-button v-if='scope.row.editable' type="success" @click='scope.row.editable=0, inlineEditRow(scope.row)' size="small" icon="check">取消</el-button>
            <el-button v-if='scope.row.isEnabled && scope.row.orderType!=="默认"&&scope.row.editable!==1' type="success" size="small" icon="delete">禁用</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        tableData: []
      }
    },
    mounted () {
      this.data_tableRule()
    },
    methods: {
      inlineEditRow ($item) {
        console.log($item)
      },
      data_tableRule ($page) {
        let self = this
        apiTable.data_tableRuleTable().then((response) => {
          self.tableData = response.data.dat
        })
      },
      handle_row ($item, $status) {

      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
