<template>
  <div class="delivery-rule">
    <div class="search-table">
      <el-form label-width="90px">
        <el-row style="margin-bottom: 20px;color: red;font-size: 14px;font-weight: 600;padding: 0 8px">
          <el-col :span="24">
            推送规则说明:修改后下一条订单开始生效.-1表示不推,0表示立即.
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="推送时间点" align="center">
              <el-select v-model="searchData.point" placeholder="订单类型">
                <el-option
                  v-for="($item, $index) in this.$store.state.select.ruleTime"
                  :label="$item.label"
                  :value="$item.value"
                  :key="$index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="data_table">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="tableData.dat"
      :max-height="tabHeight"
      :height="tabHeight"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        label="类别">
        <template scope="scope">
          <span>{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="推送距离(KM)">
        <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].distance"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.distance?scope.row.distance: '- -'}}</span>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="优先级">
        <el-table-column
          align="center"
          label="员工(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].config.yg"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.yg}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="社会(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].config.sh"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.sh}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="回退邮包(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.editable" size="small" v-model="copyRow.dat[scope.$index].config.wl"></el-input>
            <span v-show="!scope.row.editable">{{scope.row.config.wl}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="操作"
        width="250"
        align="center">
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
        searchData: {
          point: '1'
        },
        tableData: [],
        copyRow: []
      }
    },
    computed: {
      tabHeight () {
        return this.$store.state.include.tableHeight - 305
      }
    },
    mounted () {
      this.data_table('0', 'init')
      this.fetch_ruleTime()
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
        Object.keys($row).forEach(($item, $index) => {
          this.setNumber($row, $item)
        })
        apiTable.edit_personRuleEdit($row).then((response) => {
          if (response.data.code !== 1) {
            this.$message({
              duration: 1500,
              message: response.data.mag
            })
          } else {
            this.$message({
              duration: 1500,
              message: response.data.mag
            })
            this.data_table()
          }
        })
      },
      setNumber ($data, $key) {
        if (typeof $data[$key] === 'object') {
          Object.keys($data[$key]).forEach(($item, $index) => {
            this.setNumber($data[$key], $item)
          })
        } else if (typeof $data[$key] === 'string' && Number($data[$key])) {
          $data[$key] = Number($data[$key])
        }
      },
      resetForm () {
        this.searchData.orderType = ''
      },
      inlineEditRow ($item) {

      },
      data_table ($page, $sta) {
        let self = this
        apiTable.data_deliveryRuleTable().then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data
            let copyData = JSON.stringify(self.tableData)
            self.copyRow = JSON.parse(copyData)
          }
        })
        if (!$sta) {
          apiTable.edit_SaveRuleTime({
            point: this.searchData.point
          }).then(() => {
            this.$message({
              duration: 1500,
              message: '保存成功！'
            })
          })
        }
      },
      fetch_ruleTime ($page) {
        apiTable.data_fetchRuleTime().then((response) => {
          if (response.data.code === 1) {
            this.searchData.point = response.data.dat.toString()
          }
        })
      },
      enable_row ($row, $type) {
        let str = $type === 0 ? '是否禁用' : '是否启用?'
        swal({
          title: str,
          type: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          apiTable.edit_personRuleEnable({
            id: $row.id,
            isEnabled: $type
          }).then((response) => {
            if (response.data.code === 1) {
              this.data_table()
            }
          })
        }, () => {

        })
      },
      handle_row ($item, $status) {

      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
