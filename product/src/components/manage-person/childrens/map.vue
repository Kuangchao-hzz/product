<template>
  <div class="person-map">
    <div class="country-select">
      <span>区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
      <a href="javascript:;" @click="treeDialog.type = true">切换</a>
    </div>
    <div class="content-map">
      <div class="map-box-card">
        <el-card class="box-card">
          <div class="card-content">
            <div class="card-item">
              <label>待配送订单：</label>
              <span>1</span>
            </div>
            <div class="card-item">
              <label>配送中订单：</label>
              <span>2</span>
            </div>
            <div class="card-item">
              <label>今日已送达订单：</label>
              <span>3</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="map-box-content">
        <div class="box-content-win">
          <div class="amap-wrapper">
            <el-amap :vid="'amap-vue'"
                     :zoom="zoom"
                     :center="center">
              <el-amap-marker v-if="userPoints.length > 0" v-for="(marker, $index) in userPoints"
                              :position="marker.position"
                              :events="marker.events"
                              :visible="marker.visible"
                              :draggable="marker.draggable"
                              :key="$index"></el-amap-marker>
            </el-amap>
          </div>
        </div>
        <div class="box-content-info" v-if="personInfoData.id">
          <h5>配送员信息</h5>
          <div class="info-item">
            <label>配送:</label>
            <span>
              <router-link :to="{ path: '/person/personDetails', query: { id: personInfoData.id }}">{{personInfoData.realName}}</router-link>
            </span>
          </div>
          <div class="info-item">
            <label>手机:</label>
            <span>{{personInfoData.phone}}</span>
          </div>
          <div class="info-item">
            <label>等级:</label>
            <span>{{personInfoData.level + '级'}}</span>
          </div>
          <div class="info-item">
            <label>当前状态:</label>
            <span v-if="personInfoData.workStatus">
            {{ personInfoData.workStatus == '1'? '抢单中' : '' }}
            {{ personInfoData.workStatus == '2'? '休息中' : '' }}
            {{ personInfoData.workStatus == '3'? '配送中' : '' }}
            </span>
            <span v-else="">- -</span>
          </div>
          <div class="info-item">
            <label>当前订单:</label>
            <span v-for="($item, $index) in personInfoData.orders">
              <router-link :to="{path: '/order/orderDetails', query: { orderId: $item.orderId, detailsType: 1 }}">{{$item.orderNo}}</router-link>
            </span>
          </div>
        </div>
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
            :data="this.routerAuthData"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="getCheckedNodes">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import apiTable from '@/api/table'
  export default {
    data () {
      return {
        country: [],
        center: [121.5273285, 31.21515044],
        zoom: 14,
        mapData: {},
        personInfoData: {},
        countryText: [],
        checkedNodesData: [],
        treeDialog: {
          type: false,
          name: '',
          routerAuth: []
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      routerAuthData () {
        return this.$store.state.select.treeCountry
      },
      handlerCountryText () {
        return this.countryText.join('/')
      },
      amapMapData () {
        return this.mapData
      },
      userPoints () {
        let self = this
        let userPointsArr = []
        if (this.amapMapData && this.amapMapData.userPoints) {
          this.amapMapData.userPoints.forEach(function ($item, $index) {
            userPointsArr.push({
              position: [$item.loc.x, $item.loc.y],
              events: {
                click: () => {
                  self.fetch_Data($item.id)
                },
                dragend: (e) => {
                  this.markers[$index].position = [e.lnglat.lng, e.lnglat.lat]
                }
              },
              visible: true,
              draggable: false
            })
          })
        }
        return userPointsArr
      },
      orderLength () {
        /* eslint-disable no-unneeded-ternary */
        if (this.personInfoData.orders) {
          return this.personInfoData.orders.length > '0' ? true : false
        }
      }
    },
    mounted () {
      this.data_table({
        provinces: [],
        cities: [],
        districts: [],
        storeIds: []
      })
    },
    methods: {
      getCheckedNodes () {
        this.checkedNodesData = this.$refs.tree.getCheckedNodes()
        this.fetch_mapData()
      },
      fetch_mapData () {
        let self = this
        let $params = {
          provinces: [],
          cities: [],
          districts: [],
          storeIds: []
        }
        self.countryText = []
        self.checkedNodesData.forEach(function ($item, $index) {
          self.countryText.push($item.label)
          self.handleClose()
          if ($item.id <= 200) {
            $params.provinces.push($item.id)
          } else if ($item.id <= 2000 && $item.id > 200) {
            $params.cities.push($item.id)
          } else if ($item.id <= 20000 && $item.id > 2000) {
            $params.districts.push($item.id)
          } else {
            $params.storeIds.push($item.id)
          }
        })
        self.data_table($params)
      },
      handleClose (done) {
        this.treeDialog.type = false
      },
      fetchCityData ($country) {
        this.data_table()
      },
      data_table ($params) {
        let self = this
        apiTable.data_personMapTable($params).then((response) => {
          if (response.data.code !== 1) {
            this.$message(response.data.msg)
          } else {
            self.mapData = response.data.dat
          }
        })
      },
      fetch_Data ($id) {
        let self = this
        apiTable.data_personMapInfo({
          id: $id
        }).then((response) => {
          self.personInfoData = response.data.dat
        })
      }
    },
    watch: {
      mapData () {
        if (this.mapData && this.mapData.point.x && this.mapData.point.y) {
          this.center = []
          this.center.push(this.mapData.point.x)
          this.center.push(this.mapData.point.y)
        }
        setTimeout(() => {
          this.fetch_mapData()
        }, 30000)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .person-map{
    .country-select{
      margin-bottom: 20px;
      span{
        color: #666;
      }
    }
    .map-box-card{
      width: 700px;
      margin-bottom: 20px;
      .card-content{
        display: flex;
        .card-item{
          width: 200px;
          display: table;
          box-sizing: border-box;
          padding: 5px 20px;
          label{
            display: table-cell;
            vertical-align: middle;
            text-align: left;
          }
          span{
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
    .map-box-content{
      width: 100%;
      display: flex;
      border-radius: 5px;
      .box-content-win{
        overflow: hidden;
        background: #fff;
        >div{
          width: 700px;
          height: 450px;
          border-radius: 4px;
          margin-right: 20px;
        }
      }
      .box-content-info{
        width: 280px;
        height: 300px;
        background: #c2e1f7;
        color: #012b6b;
        h5{
          padding: 20px 0 20px 20px;
          font-size: 18px;
          position: relative;
          font-weight: normal;
          &::before{
            content: '';
            display: block;
            width: 4px;
            height: 30px;
            background: #012b6b;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .info-item{
          display: table;
          padding: 5px 10px;
          overflow: hidden;
          vertical-align: middle;
          label{
            width: 100px;
            display: table-cell;
          }
          span{
            display: block;
          }
        }
      }
    }
  }
</style>
