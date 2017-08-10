<template>
  <div class="content-table">
    <el-table
      :data="tableData.dat"
      :max-height="tabHeight"
      :height="tabHeight"
      border
      style="width: 100%">
      <el-table-column
        width="100"
        align="center"
        prop="orderType"
        label="订单类别">
        <template scope="scope">
          <span>{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="距离(km)">
        <el-table-column
          align="center"
          label="起步">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_dj_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.jl_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="首费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_jl_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_jl_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续里程">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].jl_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.jl_x }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_jl_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_jl_x }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="重量(kg)">
        <el-table-column
          align="center"
          label="首重">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].zl_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.zl_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="首费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_zl_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_zl_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续重">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].zl_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.zl_x }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_zl_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_zl_x }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        label="等级">
        <el-table-column
          width="100"
          align="center"
          label="起始等级">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_jl_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_jl_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="首费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].dj_qs"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.dj_qs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续级">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].dj_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.dj_x }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续费">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].fee_dj_x"></el-input>
            <span v-show="!scope.row.editable">{{ scope.row.fee_dj_x }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        width="260"
        align="center"
        label="操作"
        fit
        fixed="right">
        <template scope="scope">
          <el-button v-if='!scope.row.editable' type="primary" size="small" icon="edit" @click="editRow(scope.row)">编辑</el-button>
          <el-button v-if='scope.row.editable' type="success" size="small" icon="check" @click="submitEditRow(copyRow.dat[scope.$index])">完成</el-button>
          <el-button v-if='scope.row.editable' type="success" size="small" icon="delete" @click="matchRow(scope.row)">取消</el-button>
          <el-button v-if='scope.row.isEnabled == 1 && scope.row.orderType!=="默认"' type="success" size="small" icon="delete" @click="enable_row(scope.row, 0)">禁用</el-button>
          <el-button v-if='scope.row.isEnabled == 0 && scope.row.orderType!=="默认"' type="success" size="small" icon="delete" @click="enable_row(scope.row, 1)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        tableData: [],
        copyRow: [],
        tableInlineData: {}
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 240
      }
    },
    mounted () {
      this.data_table()
    },
    methods: {
      editRow ($row) {
        this.tableData.dat.forEach(($item, $index) => {
          $item.editable = 0
        })
        this.matchRow($row)
        $row.editable = 1
      },
      matchRow ($row) {
        $row.editable = 0
        let copyData = JSON.stringify(this.tableData)
        this.copyRow = JSON.parse(copyData)
      },
      submitEditRow ($row) {
        apiTable.edit_personMoneyEdit($row).then((response) => {
          this.$message('操作成功！')
          this.data_table()
        })
      },
      tableInlineEdit ($row) {
        this.tableInlineData = Object.assign({}, $row)
      },
      data_table ($page) {
        let self = this
        apiTable.data_deliveryMoneyTable({
          page: $page - 1 || 0
        }).then((response) => {
          self.tableData = response.data
          let copyData = JSON.stringify(self.tableData)
          self.copyRow = JSON.parse(copyData)
        })
      },
      enable_row ($row, $type) {
        apiTable.edit_personMoneyEnable({
          id: $row.id,
          isEnabled: $type
        }).then((response) => {
          swal({
            title: '操作成功！',
            width: 300
          })
          this.data_table()
        })
      },
      inlineEditRow ($item) {

      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
