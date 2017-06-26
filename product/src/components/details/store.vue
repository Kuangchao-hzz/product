<template>
  <div class="order-details">
    <div class="details-title">
      订单详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="base-info">
            <el-form ref="detailsDataForm" :model="detailsData" label-width="80px">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="地区:">
                    <el-input :value="detailsData.area" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="门店号:">
                    <el-input :value="detailsData.storeNo" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="门店名称:">
                    <el-input :value="detailsData.name" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item label="地址:">
                    <el-input value="上海市普陀区新村路1500号1层" class="reset-border" readonly></el-input>
                    <div class="person-map">
                      <el-amap :vid="'amap-vue'" :center="mapConfig.center"></el-amap>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="联系人:">
                    <el-input :value="detailsData.contactPerson"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系方式:">
                    <el-input :value="detailsData.contact"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注:">
                <el-input type="textarea" :value="detailsData.remark" v-model="detailsData.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="details_SubmitStore">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
  import apiDetails from '@/api/details'
  export default {
    data () {
      return {
        detailsData: {},
        mapConfig: {
          center: ['120.639966', '31.364785']
        }
      }
    },
    methods: {
      details_tableStore ($params) {
        let self = this
        let params = {
          id: $params
        }
        apiDetails.details_tableStoreTable(params).then((response) => {
          if (response.data.code === 1) {
            self.detailsData = response.data.dat
          } else {
            alert(response.data.msg)
          }
        })
      },
      details_SubmitStore () {
        let self = this
        apiDetails.details_submitStoreTable(self.detailsData).then((response) => {
          if (response.data.code === 1) {
            alert(response.data.msg)
          } else {
            alert(response.data.msg)
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_tableStore(to.query.id)
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .order-details{
    color: #666;
    .details-title{
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 24px;
    }
    .content-body{
      padding: 20px 0;
      .base-info{
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 20px;
        .person-map{
          width: 400px;
          height: 200px;
          border: 1px #ddd solid;
          border-radius: 5px;
          margin: 3px 10px;
        }
      }
    }
  }
</style>
