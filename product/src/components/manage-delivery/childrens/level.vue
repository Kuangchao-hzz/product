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
          align="center"
          label="准达率"
          show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.ontimeRate}}%
          </template>
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
                       disabled
            ><a href="javascript:" @click="edit_tableDialogAuto(scope.row, scope.$index)" disabled>编辑</a></el-button>
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
      <el-form ref="dialogEditOrderForm"
               :model="dialogEditOrderForm"
               :rules="rules1"
               label-width="100px">
        <el-form-item label="等级设置">
          <el-input v-model="dialogEditOrderForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item
          prop="orderType"
          label="订单类别">
          <el-checkbox-group v-model="dialogEditOrderForm.orderType">
            <el-checkbox :label="$item"
                         name="type"
                         v-for="($item, $index) in orderType"
                         :key="$index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          prop="priceLimit"
          label="订单总价上限">
          <el-input v-model="dialogEditOrderForm.priceLimit"></el-input>
        </el-form-item>
        <el-form-item
          prop="amountLimit"
          label="每日订单上限">
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
      <el-form ref="dialogEditLevelForm"
               :rules="rules2"
               :model="dialogEditLevelForm"
               label-width="100px">
        <el-form-item label="等级设置">
          <el-input v-model="dialogEditLevelForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item
          prop="month"
          label="工作年限">
          <el-input v-model="dialogEditLevelForm.month">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="orderAmount"
          label="订单量">
          <el-input v-model="dialogEditLevelForm.orderAmount">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="ontimeRate"
          label="准达率">
          <el-input v-model="dialogEditLevelForm.ontimeRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="backRate"
          label="退单率">
          <el-input v-model="dialogEditLevelForm.backRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
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
        tableDataAuto: [],
        rules1: {
          orderType: [
            {
              trigger: 'change',
              type: 'array',
              validator: (rule, value, callback) => {
                if (value.length < 1) {
                  return callback(new Error('请选择订单类别'))
                }
                callback()
              }
            }
          ],
          priceLimit: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('请输入订单总价上限'))
                }
                callback()
              }
            }
          ],
          amountLimit: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('请输入每日订单上限'))
                }
                callback()
              }
            }
          ]
        },
        rules2: {
          month: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let editRow = this.dialogEditLevelForm
                if (!value) {
                  return callback(new Error('请输入工作年限'))
                }
                if (editRow.index !== 0 && value < this.tableDataAuto[editRow.index - 1].month) {
                  return callback(new Error('该等级年限不能小于上一个等级年限'))
                }
                if (editRow.index !== 4 && value > this.tableDataAuto[editRow.index + 1].month) {
                  return callback(new Error('该等级年限不能大于下一个等级年限'))
                }
                callback()
              }
            }
          ],
          orderAmount: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let editRow = this.dialogEditLevelForm
                if (!value) {
                  return callback(new Error('请输入订单量'))
                }
                if (editRow.index !== 0 && value < this.tableDataAuto[editRow.index - 1].orderAmount) {
                  return callback(new Error('该等级订单量不能小于上一个等级订单量'))
                }
                if (editRow.index !== 4 && value > this.tableDataAuto[editRow.index + 1].orderAmount) {
                  return callback(new Error('该等级订单量不能大于下一个等级订单量'))
                }
                callback()
              }
            }
          ],
          ontimeRate: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let editRow = this.dialogEditLevelForm
                if (!value) {
                  return callback(new Error('请输入准达率'))
                }
                if (editRow.index !== 0 && value < this.tableDataAuto[editRow.index - 1].ontimeRate) {
                  return callback(new Error('该等级准达率不能小于上一个等级准达率'))
                }
                if (editRow.index !== 4 && value > this.tableDataAuto[editRow.index + 1].ontimeRate) {
                  return callback(new Error('该等级准达率不能大于下一个等级准达率'))
                }
                callback()
              }
            }
          ],
          backRate: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let editRow = this.dialogEditLevelForm
                if (!value) {
                  return callback(new Error('请输入退单率'))
                }
                if (editRow.index !== 0 && value > this.tableDataAuto[editRow.index - 1].backRate) {
                  return callback(new Error('该等级退单率不能大于上一个等级退单率'))
                }
                if (editRow.index !== 4 && value < this.tableDataAuto[editRow.index + 1].backRate) {
                  return callback(new Error('该等级退单率不能小于下一个等级退单率'))
                }
                callback()
              }
            }
          ]
        }
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
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          }
        })
      },
      data_tableAuto ($page) {
        let self = this
        apiTable.data_deliveryLevelTableAuto({
          page: $page - 1 || 0
        }).then((response) => {
          if (response.data.code === 1) {
            self.tableDataAuto = response.data.dat
          }
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
      edit_tableDialogAuto ($row, index) {
        Object.keys($row).forEach(($item, $index) => {
          $row[$item] = $row[$item].toString()
        })
        this.dialogEditLevel = true
        this.dialogEditLevelForm = Object.assign({}, $row, {
          index: index
        })
      },
      edit_table () {
        let self = this
        this.$refs['dialogEditOrderForm'].validate((valid) => {
          if (valid) {
            /* eslint-disable eqeqeq */
            self.dialogEditOrderForm.orderType.join('、') === self.orderType.join('、') ? self.dialogEditOrderForm.orderType = '所有' : self.dialogEditOrderForm.orderType = self.dialogEditOrderForm.orderType.join('、')

            apiTable.edit_deliveryLevelTable(self.dialogEditOrderForm).then((response) => {
              if (response.data.code === 1) {
                self.dialogEditOrder = false
                /* eslint-disable no-undef */
                this.$message({
                  duration: 1500,
                  message: '编辑成功！'
                })
                this.$refs['dialogEditOrderForm'].resetFields()
                self.data_table()
              }
            })
          } else {
            return false
          }
        })
      },
      edit_tableAuto () {
        let self = this
        this.$refs['dialogEditLevelForm'].validate((valid) => {
          if (valid) {
            // 列表数据
            let tableData = self.tableDataAuto
            let index = self.dialogEditLevelForm.index
            let editData = Object.assign({}, self.dialogEditLevelForm)
            Object.keys(editData).forEach(($item, $index) => {
              editData[$item] = Number(editData[$item])
            })
            delete editData.id
            delete editData.level
            delete editData.index
            if (index === 0) {
              let nextRow = Object.assign({}, tableData[index + 1])
              delete nextRow.id
              delete nextRow.level
              if (JSON.stringify(nextRow) === JSON.stringify(editData)) {
                this.$message({
                  duration: 1500,
                  message: '该等级不能与下一个等级相同'
                })
                return false
              }
            } else if (index === 4) {
              let prevRow = Object.assign({}, tableData[index - 1])
              delete prevRow.id
              delete prevRow.level
              if (JSON.stringify(prevRow) === JSON.stringify(editData)) {
                this.$message({
                  duration: 1500,
                  message: '该等级不能与上一个等级相同'
                })
                return false
              }
            } else {
              let nextRow = Object.assign({}, tableData[index + 1])
              let prevRow = Object.assign({}, tableData[index - 1])
              delete nextRow.id
              delete nextRow.level
              delete prevRow.id
              delete prevRow.level
              if (JSON.stringify(nextRow) === JSON.stringify(editData)) {
                this.$message({
                  duration: 1500,
                  message: '该等级不能与下一个等级相同'
                })
                return false
              }
              if (JSON.stringify(prevRow) === JSON.stringify(editData)) {
                this.$message({
                  duration: 1500,
                  message: '该等级不能与上一个等级相同'
                })
                return false
              }
            }
            apiTable.edit_deliveryLevelTableAuto(self.dialogEditLevelForm).then((response) => {
              self.dialogEditLevel = false
              this.$message({
                duration: 1500,
                message: '编辑成功！'
              })
              this.$refs['dialogEditLevelForm'].resetFields()
              self.data_tableAuto()
            })
          } else {
            return false
          }
        })
      },
      handleClose (done) {
        this.dialogEditLevel = false
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
