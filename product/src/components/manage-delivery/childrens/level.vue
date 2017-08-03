<template>
  <div class="delivery-level">
    <div class="delivery-level-tag">
      <el-tag>配送等级接单规则</el-tag>
    </div>
    <div class="delivery-level-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          label="等级">
          <template scope="scope">
            {{ scope.row.level + '级' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderType"
          align="center"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="priceLimit"
          align="center"
          label="订单价格上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="amountLimit"
          align="center"
          label="订单每日上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template
            scope="scope">
            <el-button
              type="text"
              size="small">
              <a href="javascript:" @click="edit_tableDialog(scope.row)">编辑</a>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="delivery-level-tag">
      <el-tag>配送等级自动升级规则</el-tag>
    </div>
    <div class="delivery-level-table">
      <el-table
        ref="multipleTable"
        :data="tableDataAuto"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          align="center"
          label="等级">
          <template scope="scope">
            {{ scope.row.level + '级' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="month"
          align="center"
          label="工作年限(月)">
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          align="center"
          label="接单量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ontimeRate"
          align="center"
          label="准达率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="退单率"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.backRate + '%'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><a href="javascript:" @click="edit_tableDialogAuto(scope.row)">编辑</a></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog (配送等级接单规则-编辑) -->
    <el-dialog
      title="配送等级接单规则设置"
      :visible.sync="dialogEditOrder"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="dialogEditOrderForm" label-width="100px">
        <el-form-item label="等级设置">
          <el-input v-model="dialogEditOrderForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单类别">
          <el-checkbox-group v-model="dialogEditOrderForm.orderType">
            <el-checkbox :label="$item"
                         name="type"
                         v-for="($item, $index) in orderType"
                         :key="$index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="订单总价上限">
          <el-input v-model="dialogEditOrderForm.priceLimit"></el-input>
        </el-form-item>
        <el-form-item label="每日订单上限">
          <el-input v-model="dialogEditOrderForm.amountLimit"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditOrder = false">取 消</el-button>
        <el-button type="primary" @click="edit_table">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog (配送等级自动升级规则-编辑) -->
    <el-dialog
      title="配送等级自动升级规则设置"
      :visible.sync="dialogEditLevel"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="dialogEditLevelForm" label-width="100px">
        <el-form-item label="等级设置">
          <el-input v-model="dialogEditLevelForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input v-model="dialogEditLevelForm.month">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="订单量">
          <el-input v-model="dialogEditLevelForm.orderAmount">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="准达率">
          <el-input v-model="dialogEditLevelForm.ontimeRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="退单率">
          <el-input v-model="dialogEditLevelForm.backRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditLevel = false">取 消</el-button>
        <el-button type="primary" @click="edit_tableAuto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        orderType: ['普通', '水果', '海鲜', '冻品'],
        dialogEditOrder: false,
        dialogEditLevel: false,
        dialogEditOrderForm: {},
        dialogEditLevelForm: {},
        tableData: [],
        tableDataAuto: []
      }
    },
    mounted () {
      this.data_table()
      this.data_tableAuto()
    },
    methods: {
      data_table ($page) {
        let self = this
        apiTable.data_deliveryLevelTable({
          page: $page - 1 || 0
        }).then((response) => {
          self.tableData = response.data.dat
        }).catch(() => {
          swal('服务器错误')
        })
      },
      data_tableAuto ($page) {
        let self = this
        apiTable.data_deliveryLevelTableAuto({
          page: $page - 1 || 0
        }).then((response) => {
          self.tableDataAuto = response.data.dat
        }).catch(() => {
          /* eslint-disable no-undef */
          swal('服务器错误')
        })
      },
      edit_tableDialog ($row) {
        this.dialogEditOrder = true
        this.dialogEditOrderForm = Object.assign({}, $row)

        if (this.dialogEditOrderForm.orderType === '所有') {
          this.dialogEditOrderForm.orderType = ['普通', '水果', '海鲜', '冻品']
        } else {
          this.dialogEditOrderForm.orderType = this.dialogEditOrderForm.orderType.split('、')
        }
      },
      edit_tableDialogAuto ($row) {
        this.dialogEditLevel = true
        this.dialogEditLevelForm = Object.assign({}, $row)
      },
      edit_table () {
        let self = this
        /* eslint-disable eqeqeq */
        console.log(self.dialogEditOrderForm.orderType.join('、'))
        console.log(self.orderType.join('、'))
        self.dialogEditOrderForm.orderType.join('、') === self.orderType.join('、') ? self.dialogEditOrderForm.orderType = '所有' : self.dialogEditOrderForm.orderType = self.dialogEditOrderForm.orderType.join('、')

        apiTable.edit_deliveryLevelTable(self.dialogEditOrderForm).then((response) => {
          self.dialogEditOrder = false
          /* eslint-disable no-undef */
          this.$message('编辑成功！')
          self.data_table()
        })
      },
      edit_tableAuto () {
        let self = this
        apiTable.edit_deliveryLevelTableAuto(self.dialogEditLevelForm).then((response) => {
          self.dialogEditLevel = false
          this.$message('编辑成功！')
          self.data_tableAuto()
        })
      },
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
  .delivery-level{
    .delivery-level-tag{
      .el-tag{
        padding:15px;
        line-height: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        background: #dfe6ec;
        color: #1f2d3d;
        font-weight: 600;
      }
    }
    .delivery-level-table{
      margin-bottom: 20px;
    }
  }
</style>
