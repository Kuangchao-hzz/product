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
          prop="order"
          label="等级">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订单类别">
        </el-table-column>
        <el-table-column
          prop="money"
          label="订单价格上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="订单每日上限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><a href="javascript:" @click="dialogEditOrderForm.status = true">编辑</a></el-button>
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
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="等级">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="工作年限(月)">
        </el-table-column>
        <el-table-column
          prop="money"
          label="接单量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="准达率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="退单率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text"
                       size="small"
            ><a href="javascript:" @click="dialogEditLevelForm.status = true">编辑</a></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-group"></div>
    <!-- dialog (配送等级接单规则-编辑) -->
    <el-dialog
      title="等级设置"
      :visible.sync="dialogEditOrderForm.status"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="dialogEditOrderForm" label-width="100px">
        <el-form-item label="活动名称">
          <el-input v-model="dialogEditOrderForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单类别">
          <el-checkbox-group v-model="dialogEditOrderForm.orderClass">
            <el-checkbox label="普通" name="type"></el-checkbox>
            <el-checkbox label="水果" name="type"></el-checkbox>
            <el-checkbox label="海鲜" name="type"></el-checkbox>
            <el-checkbox label="冻品" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="订单总价上限">
          <el-input v-model="dialogEditOrderForm.orderTotal"></el-input>
        </el-form-item>
        <el-form-item label="每日订单上限">
          <el-input v-model="dialogEditOrderForm.orderEverDay"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditOrderForm.status = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditOrderForm.status = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog (配送等级自动升级规则-编辑) -->
    <el-dialog
      title="等级设置"
      :visible.sync="dialogEditLevelForm.status"
      size="tiny"
      :before-close="handleClose">
      <el-form ref="form" :model="dialogEditLevelForm" label-width="100px">
        <el-form-item label="活动名称">
          <el-input v-model="dialogEditLevelForm.level" class="reset-border" readonly></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input v-model="dialogEditLevelForm.workTime">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="订单量">
          <el-input v-model="dialogEditLevelForm.orderNum">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="准达率">
          <el-input v-model="dialogEditLevelForm.successNum">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="退单率">
          <el-input v-model="dialogEditLevelForm.loserNum">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditLevelForm.status = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditLevelForm.status = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogEditOrderForm: {
          status: false,
          level: '一级',
          orderClass: [],
          orderTotal: '',
          orderEverDay: ''

        },
        dialogEditLevelForm: {
          status: false,
          level: '一级',
          workTime: '',
          orderNum: '',
          successNum: '',
          loserNum: ''

        },
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
        }]
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
