<template>
  <div class="content-table">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label=""
        width="150">
        <el-table-column
          label="订单类别">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.orderCategory"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.orderCategory }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="距离">
        <el-table-column
          label="起步距离(km)">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="首费">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.money"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.money }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="续里程(km)">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.exStart"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.exStart }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="续费">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.exMoney"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.exMoney }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="date"
        label="重量">
        <el-table-column
          prop="date"
          label="首重(kg)">
        </el-table-column>
        <el-table-column
          prop="date"
          label="首费">
        </el-table-column>
        <el-table-column
          prop="date"
          label="续重(kg)">
        </el-table-column>
        <el-table-column
          prop="date"
          label="续费">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="date"
        label="等级">
        <el-table-column
          prop="date"
          label="起始等级">
        </el-table-column>
        <el-table-column
          prop="date"
          label="首费">
        </el-table-column>
        <el-table-column
          prop="date"
          label="续级">
        </el-table-column>
        <el-table-column
          prop="date"
          label="续费">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作">
        <el-table-column>
          <template scope="scope">
            <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
            <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false, inlineEditRow(scope.row)' size="small" icon="check">完成</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          orderCategory: '默认',
          distance: {
            start: '2',
            money: '￥250',
            exStart: '20',
            exMoney: '￥250'
          },
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          edit: false
        }]
      }
    },
    methods: {
      inlineEditRow ($item) {
        alert($item)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
