<template>
  <div class="store-details">
    <div class="details-title">
      门店详情
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="base-info">
            <el-form ref="detailsDataForm" :model="detailsData" label-width="80px">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="地区:">
                    <el-input v-model="detailsData.area" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="门店号:">
                    <el-input v-model="detailsData.storeNo" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="门店名称:">
                    <el-input v-model="detailsData.name" class="reset-border" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item label="地址:">
                    <el-input v-model="detailsData.address" class="reset-border" readonly></el-input>
                    <div class="person-map">
                      <el-amap :vid="'amap-vue'"
                               :zoom="zoom">
                        <el-amap-marker v-for="(marker, $index) in userPoints"
                                        :position="marker.position"
                                        :events="marker.events"
                                        :visible="marker.visible"
                                        :draggable="marker.draggable"
                                        :key="$index"></el-amap-marker>
                      </el-amap>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="4">
                  <el-form-item label="经度:">
                    {{detailsData.longitude}}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="纬度:">
                    {{detailsData.latitude}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="联系人:">
                    <el-input v-model="detailsData.contactPerson"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系方式:">
                    <el-input v-model="detailsData.contact"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注:">
                <el-input type="textarea" v-model="detailsData.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row :gutter="10">
                  <el-button type="primary" @click="details_SubmitStore">保存</el-button>
                  <el-button @click="goBack">取消</el-button>
                </el-row>
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
  /* eslint-disable no-new */
  export default {
    data () {
      return {
        detailsData: {},
        zoom: 8
      }
    },
    mounted () {

    },
    computed: {
      amapMapData () {
        return this.detailsData
      },
      userPoints () {
        if (this.detailsData.longitude && this.detailsData.latitude) {
          return [{
            position: [this.detailsData.longitude, this.detailsData.latitude],
            events: {
              click: () => {

              },
              dragend: (e) => {
                this.markers.position = [e.lnglat.lng, e.lnglat.lat]
              }
            },
            visible: true,
            draggable: false
          }]
        }
      }
    },
    methods: {
      details_tableStore ($params) {
        let self = this
        apiDetails.details_tableStoreTable({
          id: $params
        }).then((response) => {
          self.$nextTick(function () {
            self.detailsData = response.data.dat
          })
        })
      },
      details_SubmitStore () {
        let self = this
        apiDetails.details_submitStore(self.detailsData).then((response) => {
          this.$message({
            duration: 1500,
            message: response.data.msg
          })
          self.$router.push('/delivery/store')
        })
      },
      goBack () {
        this.$router.go(-1)
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query) {
        next(vm => {
          vm.details_tableStore(to.query.id)
        })
      }
    },
    watch: {
      detailsData () {
        if (this.detailsData.latitude && this.detailsData.longitude) {
          this.center = []
          this.center.push(this.detailsData.longitude)
          this.center.push(this.detailsData.latitude)
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .store-details{
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
    .el-form-item{
      margin-bottom: 15px !important;
    }
  }
</style>
