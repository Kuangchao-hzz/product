<template>
  <div class="store-details">
    <div class="details-title">
      {{ handlerStoreType ? '编辑门店' : '新增门店' }}
    </div>
    <div class="details-content">
      <div class="content-body">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" class="base-info">
            <el-form ref="detailsDataForm"
                     :model="detailsData"
                     :rules="rules"
                     label-width="80px">
              <el-col :span="12">
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item
                      prop="country"
                      label="地区:">
                      <div class="country-select">
                        <el-cascader
                          v-model="detailsData.country"
                          :options="handlerStoreAreaData"
                          placeholder="请选择地区"
                          @change="handleChange"
                          :props="this.$store.state.select.defaultCountryProps"
                          style="width: 100%"></el-cascader>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="employeePrefix"
                      label="门店工号:">
                      <el-input v-model="detailsData.employeePrefix"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item
                      prop="storeNo"
                      label="门店号:">
                      <el-input v-model="detailsData.storeNo" :disabled="handlerStoreType"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="name"
                      label="门店名称:">
                      <el-input v-model="detailsData.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item
                      prop="longitude"
                      label="经度:">
                      <el-input v-model="detailsData.longitude"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="latitude"
                      label="纬度:">
                      <el-input v-model="detailsData.latitude"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="50">
                  <el-col :span="12">
                    <el-form-item
                      prop="contactPerson"
                      label="联系人:">
                      <el-input v-model="detailsData.contactPerson"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="contact"
                      label="联系方式:">
                      <el-input v-model="detailsData.contact"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="address"
                      label="地址:">
                      <el-input v-model="detailsData.address" style="margin-bottom: 10px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item
                  prop="remark"
                  label="备注:">
                  <el-input type="textarea"
                            v-model="detailsData.remark"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-row :gutter="10">
                    <el-button type="primary" @click="details_SubmitStore">保存</el-button>
                    <el-button @click="goBack">取消</el-button>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row :gutter="50">
                  <el-col :span="24">
                    <el-form-item
                      label-width="20px">
                      <div class="person-map" id="container">

                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  var map
  import apiDetails from '@/api/details'
  /* eslint-disable no-new */
  export default {
    data () {
      return {
        storeType: false,
        storeData: [],
        storeAreaData: [],
        detailsData: {
          id: '',
          country: [],
          areaName: '',
          storeNo: '',
          name: '',
          address: '',
          longitude: '121.499702',
          latitude: '31.239152',
          contactPerson: '',
          contact: '',
          remark: '',
          employeePrefix: ''
        },
        zoom: 12,
        rules: {
          country: [
            {type: 'array', required: true, message: '请选择地区', trigger: 'change'}
          ],
          storeNo: [
            {required: true, message: '请输入门店号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],
          longitude: [
            {required: true, message: '请输入经度', trigger: 'blur'}
          ],
          latitude: [
            {required: true, message: '请输入纬度', trigger: 'blur'}
          ],
          contactPerson: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系方式', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ],
          employeePrefix: [
            {required: true, message: '请输入工号', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      this.init()
      this.details_storeAreaData()
    },
    computed: {
      handlerStoreAreaData () {
        if (this.storeAreaData.length > 0) {
          return this.storeAreaData
        } else {
          return []
        }
      },
      handlerStoreType () {
        return this.storeType
      },
      handlerMapCenter () {
        if (this.detailsData && this.detailsData.longitude && this.detailsData.latitude) {
          return [Number(this.detailsData.longitude), Number(this.detailsData.latitude)]
        }
      },
      amapMapData () {
        return this.detailsData
      },
      userPoints () {
        if (this.detailsData.longitude && this.detailsData.latitude) {
          return [{
            position: [this.detailsData.longitude, this.detailsData.latitude],
            // position: [121.5273285, 31.21515044],
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
      init: function () {
        AMapUI.loadUI(['overlay/SimpleInfoWindow', 'overlay/SimpleMarker'], (SimpleInfoWindow, SimpleMarker) => {
          var $mapData = this.detailsData
          map = new AMap.Map('container', {
            center: [this.detailsData.longitude, $mapData.latitude],
            zoom: 12
          })
          var marker = new AMap.Marker({
            position: [$mapData.longitude, $mapData.latitude]
          })
          marker.setMap(map)
          AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
          })
        })
      },
      handleChange (value) {
        console.log(value)
      },
      details_storeAreaData () {
        apiDetails.details_storeAreaData().then((response) => {
          if (response.data.code === 1) {
            this.storeAreaData = response.data.dat
          }
        })
      },
      details_tableStore ($params) {
        let self = this
        apiDetails.details_tableStoreTable({
          id: $params
        }).then((response) => {
          self.$nextTick(function () {
            self.detailsData = response.data.dat
            Object.assign(self.detailsData, {
              country: []
            })
            self.detailsData.country.push(self.detailsData.province)
            self.detailsData.country.push(self.detailsData.city)
            self.detailsData.country.push(self.detailsData.district)
          })
        })
      },
      details_SubmitStore () {
        let self = this
        this.$refs['detailsDataForm'].validate((valid) => {
          if (valid) {
            let $params = Object.assign({}, self.detailsData)
            if ($params.country.length > 0) {
              Object.assign($params, {
                city: $params.country[1],
                province: $params.country[0],
                district: $params.country[2]
              })
            }
            delete $params.country
            if (self.detailsData.id) {
              apiDetails.details_submitStore($params).then((response) => {
                this.$message({
                  duration: 1500,
                  message: response.data.msg
                })
                self.$router.push('/delivery/store')
              })
            } else {
              apiDetails.details_submitStoreAdd($params).then((response) => {
                if (response.data.code === 1) {
                  this.$message({
                    duration: 1500,
                    message: '保存成功！'
                  })
                  self.$router.push('/delivery/store')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      goBack () {
        this.$router.go(-1)
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query && to.query.id) {
        next(vm => {
          vm.storeType = true
          vm.details_tableStore(to.query.id)
        })
      } else {
        next(vm => {
          vm.storeType = false
        })
      }
    },
    watch: {
      'detailsData.longitude' () {
        this.init()
      },
      'detailsData.latitude' () {
        this.init()
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .store-details {
    color: #666;
    .details-title {
      border-bottom: 1px #ddd solid;
      padding: 10px;
      font-size: 24px;
    }
    .content-body {
      .base-info {
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 20px;
        .person-map {
          width: 100%;
          height: 320px;
          border: 1px #ddd solid;
          border-radius: 5px;
        }
      }
    }
    .el-form-item {
      margin-bottom: 15px !important;
    }
  }
</style>
