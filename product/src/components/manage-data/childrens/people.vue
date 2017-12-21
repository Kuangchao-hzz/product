<template>
  <div class="delivery-people" v-if="btn_auth('m_psytj')">
    <div class="country-select">
      <span>请选择区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
      <a href="javascript:;" @click="treeDialog.type = true">切换</a>
    </div>
    <div class="box-card-group">
      <el-card class="box-card">
        <div class="card-content">
          <h5>本地注册</h5>
          <div class="card-item">
            <label>本地注册配送员：</label>
            <span>{{tableData.all}}</span>
          </div>
          <div class="card-item">
            <label>本地社会配送员：</label>
            <span>{{tableData.sh}}</span>
          </div>
          <div class="card-item">
            <label>本地员工配送员：</label>
            <span>{{tableData.yg}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-content">
          <h5>本日新增</h5>
          <div class="card-item">
            <label>本日新增注册：</label>
            <span>{{tableData.jrxz}}</span>
          </div>
          <div class="card-item">
            <label>本日新增社会注册：</label>
            <span>{{tableData.jrxzsh}}</span>
          </div>
          <div class="card-item">
            <label>本日新增员工注册：</label>
            <span>{{tableData.jrxzyg}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-content">
          <h5>本月新增</h5>
          <div class="card-item">
            <label>本月新增注册：</label>
            <span>{{tableData.jyxz}}</span>
          </div>
          <div class="card-item">
            <label>本月新增社会注册：</label>
            <span>{{tableData.jyxzsh}}</span>
          </div>
          <div class="card-item">
            <label>本月新增员工注册：</label>
            <span>{{tableData.jyxzyg}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="box-table-group" >
      <div class="box-table-item" v-if="tableData.ordersRank">
        <h5>本月接单配送员TOP{{tableData.ordersRank.length < 5? '5' : tableData.ordersRank.length}}</h5>
        <el-table
          :data="tableData.ordersRank"
          style="width: 100%">
          <el-table-column
            prop="realName"
            align="center"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="类别"
            width="80">
            <template scope="scope">
              {{ scope.row.userType == '1'? '员工' : '' }}
              {{ scope.row.userType == '2'? '社会' : '' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            align="center"
            label="接单">
          </el-table-column>
          <el-table-column
            align="center"
            label="准达率">
            <template scope="scope">
              {{scope.row.ontimeRate}}%
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="box-table-item" v-if="tableData.rateRank">
        <h5>本月准达配送员TOP{{tableData.rateRank.length < 5 ? '5': tableData.rateRank.length}}</h5>
        <el-table
          :data="tableData.rateRank"
          style="width: 100%">
          <el-table-column
            prop="realName"
            align="center"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="类别"
            width="80">
            <template scope="scope">
              {{ scope.row.userType == '1'? '员工' : '' }}
              {{ scope.row.userType == '2'? '社会' : '' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            align="center"
            label="接单">
          </el-table-column>
          <el-table-column
            prop="ontimeRate"
            align="center"
            label="准达率">
            <template scope="scope">
              {{scope.row.ontimeRate}}%
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="选择区域"
      :visible.sync="treeDialog.type"
      size="small"
      :before-close="handleClose">
      <el-form
        :model="treeDialog"
        label-width="80px">
        <el-form-item label="选择区域: " class="area-box">
          <el-tree
            :data="this.treeCountry"
            node-key="id"
            ref="tree"
            show-checkbox
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="getCheckedNodes(null, 'flag')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <div v-else>没有权限查看该页面</div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        checkedNodesData: [],
        searchData: {
          country: []
        },
        tableData: [],
        treeDialog: {
          type: false,
          name: '',
          routerAuth: this.$store.state.select.country
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeDefaultChecked: [],
        defaultTreeData: [],
        countryText: []
      }
    },
    computed: {
      treeCountry () {
        let $data = this.$store.state.select.country
        this.defaultTreeData = $data
        return $data
      },
      handlerCountryText () {
        return this.countryText.join(',')
      }
    },
    mounted () {
      // this.defaultCountryText(this.defaultTreeData)
      this.$nextTick(() => {
        this.getCheckedNodes(this.$store.state.select.country)
      })
    },
    methods: {
      btn_auth ($btn) {
        return this.$store.state.user.AUTHIDS.split(',').some(a => {
          return a === $btn
        })
      },
      getAllCheckedNodes ($routerAuths) {
        $routerAuths.forEach(($item, $index) => {
          this.checkedNodesData.push($item)
          if ($item.children && $item.children.length > 0) {
            this.getAllCheckedNodes($item.children)
          }
        })
      },
      getCheckedNodes ($data, $flag) {
        if ($flag !== 'flag') {
          this.getAllCheckedNodes($data)
        } else {
          this.checkedNodesData = this.$refs.tree.getCheckedNodes()
        }
        this.countryText = []
        var ids = []
        this.checkedNodesData.forEach(($item, $index) => {
          ids.push($item.id)
        })
        this.checkedNodesData.forEach(($item, $index) => {
          if (ids.indexOf($item.pid) === -1) {
            this.countryText.push($item.label)
          }
        })
        this.fetch_mapData()
      },
      fetch_mapData (mynode) {
        let self = this
        let $params = {
          provinces: [],
          cities: [],
          districts: []
        }
        self.treeDefaultChecked = []
        self.checkedNodesData.forEach(function ($item, $index) {
          self.treeDefaultChecked.push($item.id)
          if ($item.id <= 99 && $item.id >= 10) {
            $params.provinces.push($item.id)
          } else if ($item.id <= 9999 && $item.id >= 1000) {
            $params.cities.push($item.id)
          } else if ($item.id <= 999999 && $item.id >= 100000) {
            $params.districts.push($item.id)
          } else {
            $params.storeIds.push($item.id)
          }
        })
        self.data_table($params)
        self.handleClose()
      },
      handleClose (done) {
        this.treeDialog.type = false
      },
      data_table ($params) {
        let self = this
        apiTable.data_dataPeopleTable($params).then((response) => {
          if (response.data.code === 1) {
            self.tableData = response.data.dat
          }
        })
      }
    },
    watch: {
      'treeDialog.type' () {
        if (this.treeDialog.type) {
          this.$nextTick(() => {
            this.$refs['tree'].setCheckedKeys(this.treeDefaultChecked)
          })
        } else {
          this.$refs['tree'].setCheckedKeys([])
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
.delivery-people{
  .country-select{
    margin-bottom: 20px;
    span{
      color: #666;
    }
  }
  .box-card-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-card{
      width: 33%;
      .el-card__body {
        padding: 0 0 20px 0;
        h5{
          text-align: center;
          font-size: 24px;
          padding: 10px 0;
          background: #ddd;
          margin-bottom: 10px;
        }
        .card-item {
          display: table;
          box-sizing: border-box;
          width: 100%;
          padding: 5px 20px;
          &:hover {
            background: #ddd;
          }
          label {
            display: table-cell;
            text-align: left;
          }
          span {
            display: table-cell;
            position: relative;
            float: left;
            width: 100%;
            text-align: right;
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .box-table-group{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .box-table-item{
      width: 48%;
      border-radius: 5px;
      overflow: hidden;
      h5 {
        background: #ddd;
        text-align: center;
        font-size: 28px;
        padding: 10px 0;
      }
    }
  }
  .area-box{
    .el-tree{
      height: 400px;
      overflow-y: auto;
      border: 1px #ddd solid;
      border-radius: 4px;
    }
  }
}
</style>
