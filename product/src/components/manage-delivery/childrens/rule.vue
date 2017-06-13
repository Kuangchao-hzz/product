<template>
  <div class="delivery-rule">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="类别">
        <template scope="scope">
          <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="推送距离(KM)">
        <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
          </template>
      </el-table-column>
      <el-table-column
        label="优先级">
        <el-table-column
          label="员工(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="三方物流(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="社会(分钟)">
          <template scope="scope">
            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.distance.start"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.distance.start }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="操作">
        <el-table-column>
          <template scope="scope">
            <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
            <el-button v-show='scope.row.edit' type="success" @click='scope.row.edit=false, inlineEditRow(scope.row)' size="small" icon="check">完成</el-button>
            <el-button type="success" size="small" icon="delete">禁用</el-button>
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
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
