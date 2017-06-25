<template>
  <div class="person-money">
    <div class="search-table">
      <el-form :inline="true" ref="form">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item>
              <div class="country-select">
                <el-cascader
                  :options="this.$store.state.select.country"
                  change-on-select
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-date-picker
                v-model="searchData.orderTimeBetween"
                type="datetimerange"
                placeholder="选择时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="searchData.payStatus" placeholder="结算状态">
                <el-option
                  v-for="item in this.$store.state.select.payStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="searchData.personName" placeholder="配送员姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.personMobile" placeholder="配送员联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-input v-model="searchData.order" placeholder="订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="person-money-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订单时间">
        </el-table-column>
        <el-table-column
          prop="money"
          label="佣金"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="person"
          label="配送员"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          width="200">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="place"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moneyMethod"
          label="结算状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="person-manage-pagination">
      <div class="other-btn">
        <el-row>
          <el-col :span="4">
            <el-button :plain="true" type="info">导出excel</el-button>
          </el-col>
          <el-col :span="10">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileList: [],
        searchData: {
          order: '',
          payStatus: '',
          personName: '',
          orderTimeBetween: '',
          personMobile: ''
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
      submitUpload () {
        this.$refs.upload.submit()
      },
      submitForm () {
        alert(JSON.stringify(this.searchData))
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .person-money{
    .search-table{
      .el-col{
        >div{
          width: 100%;
          >div{
            width: 100%;
            >div{
              width: 100%;
            }
          }
        }
      }
    }
    .person-money-table{
      margin-bottom: 20px;
    }
    .person-manage-pagination{
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div{
        width: 50%;
      }
    }
  }

</style>
