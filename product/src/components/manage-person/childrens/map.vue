<template>
  <div class="person-map">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="country-select">
          <span>请选择区域 : {{handlerCountryText}}&nbsp;&nbsp;</span>
        </div>
        <div>
          <el-form
            :model="treeDialog"
            label-width="0">
            <el-form-item class="area-box">
              <el-tree
                :data="this.treeCountry"
                node-key="id"
                ref="tree"
                default-expand-all
                show-checkbox
                :props="defaultProps">
              </el-tree>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button @click="resetCheckedNodes">重置</el-button>
              <el-button @click="setAllCheckedNodes">全选</el-button>
              <el-button type="primary" @click="getCheckedNodes">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="content-map">
          <div class="map-box-card">
            <el-card class="box-card">
              <div class="card-content">
                <div class="card-item">
                  <label>待配送订单：</label>
                  <span>{{mapData.dpsCount}}</span>
                </div>
                <div class="card-item">
                  <label>配送中订单：</label>
                  <span>{{mapData.pszCount}}</span>
                </div>
                <div class="card-item">
                  <label>附近快递员：</label>
                  <span>{{mapData.psyCount}}</span>
                </div>
              </div>
            </el-card>
          </div>
          <el-col :span="24" style="margin-bottom: 15px;">
            <el-checkbox-group v-model="mapFilter" @change="mapFilterFn">
              <el-checkbox label="1">休息中</el-checkbox>
              <el-checkbox label="2">配送中</el-checkbox>
              <el-checkbox label="3">禁止接单</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <div class="map-box-content">
            <div class="box-content-win">
              <div class="amap-wrapper" id="container"></div>
            </div>
            <div class="box-content-info" v-if="personInfoData.id">
              <h5>配送员信息</h5>
              <div class="info-item">
                <label>配送:</label>
                <span>
              <router-link
                :to="{ path: '/person/personDetails', query: { id: personInfoData.id }}">{{personInfoData.realName}}</router-link>
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
                  {{ personInfoData.workStatus == '1' ? '抢单中' : '' }}
                  {{ personInfoData.workStatus == '2' ? '休息中' : '' }}
                  {{ personInfoData.workStatus == '3' ? '配送中' : '' }}
                </span>
                <span v-else="">- -</span>
              </div>
              <div class="info-item">
                <label>当前订单:</label>
                <span v-for="($item, $index) in personInfoData.orders">
              <router-link
                :to="{path: '/order/orderDetails', query: { orderId: $item.orderId, detailsType: 1 }}">{{$item.orderNo}}</router-link>
            </span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  import apiTable from '@/api/table'
  var setTime
  var map
  var marker = []
  /* eslint-disable no-unused-vars */
  var infoWindow
  export default {
    data () {
      return {
        mapFilter: ['1', '2', '3'],
        mapData: {
          point: {
            x: 121.418286,
            y: 31.302316
          }
        },
        country: [],
        defaultInitStatus: true,
        change: 1,
        mapReqDataParams: {},
        personInfoData: {},
        countryText: [],
        checkedNodesData: [],
        defaultTreeData: [],
        treeDefaultChecked: [],
        copyMapData: [],
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
      handlerCountryText () {
        return this.countryText.join(',')
      },
      treeCountry () {
        let $data = this.$store.state.select.treeCountry
        this.defaultTreeData = $data
        return $data
      },
      amapMapData () {
        return this.mapData
      }
    },
    mounted () {
      localStorage.setItem('map_zoom', 12)
      this.setAllCheckedNodes()
      setTime = setInterval(() => {
        this.change = 0
        this.defaultInit().then(() => {
          this.init()
          this.fetch_mapData()
        })
      }, 1200 * 1000)
    },
    methods: {
      mapFilterFn () {
        this.change = 0
        this.defaultInit().then(() => {
          this.init()
          this.fetch_mapData()
        })
      },
      setAllCheckedNodes () {
        this.$nextTick(() => {
          this.$refs['tree'].setCheckedNodes(this.$store.state.select.treeCountry)
          this.defaultInit().then(() => {
            this.getCheckedNodes()
          })
        })
      },
      resetCheckedNodes () {
        this.$refs.tree.setCheckedKeys([])
        this.getCheckedNodes()
      },
      getCheckedNodes () {
        this.change = 1
        this.checkedNodesData = this.$refs.tree.getCheckedNodes()
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
        console.log(JSON.stringify(this.mapReqDataParams))
        var a = this.mapReqDataParams
        let $params = Object.assign({}, this.mapReqDataParams, {
          provinces: [],
          cities: [],
          districts: [],
          storeIds: [],
          change: this.change
        })
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
      },
      fetchStoreData ($country) {
        this.defaultInitStatus = true
      },
      defaultInit () {
        return new Promise(resolve => {
          var $mapData = this.mapData
          map = new AMap.Map('container', {
            center: [$mapData.point.x, $mapData.point.y],
            zoom: 12
          })
          let mapBounds = map.getBounds()
          let Center = map.getCenter()
          localStorage.setItem('map_zoom', map.getZoom())
          let $params = {
            lng: Center.lng,
            lat: Center.lat,
            lng1: mapBounds.southwest.lng,
            lat1: mapBounds.southwest.lat,
            lng2: mapBounds.northeast.lng,
            lat2: mapBounds.northeast.lat
          }
          Object.assign(this.mapReqDataParams, $params)
          this.change = 0
          AMap.event.addListener(map, 'dragend', (e) => {
            let mapBounds = map.getBounds()
            let Center = map.getCenter()
            localStorage.setItem('map_zoom', map.getZoom())
            let $params = {
              lng: Center.lng,
              lat: Center.lat,
              lng1: mapBounds.southwest.lng,
              lat1: mapBounds.southwest.lat,
              lng2: mapBounds.northeast.lng,
              lat2: mapBounds.northeast.lat
            }
            Object.assign(this.mapReqDataParams, $params)
            this.change = 0
            this.fetch_mapData()
          })
          this.defaultInitStatus = false
          resolve()
        })
      },
      init: function () {
        var that = this
        var $mapData = this.mapData
        AMapUI.loadUI(['overlay/SimpleInfoWindow', 'overlay/SimpleMarker'], (SimpleInfoWindow, SimpleMarker) => {
          map.setZoom(localStorage.getItem('map_zoom'))
          if ($mapData.userPoints.length > 0) {
            var userPoints = $mapData.userPoints.filter($point => {
              var $p = 1
              if ($point.workStatus === null) {
                $p = 1
              } else {
                $p = $point.workStatus
              }
              if (that.mapFilter.indexOf(String($p)) !== -1) {
                return true
              }
            })
            userPoints.forEach(($item, $index) => {
              let $color = 'green'
              let $label = ''
              switch ($item.workStatus) {
                case 3 :
                  $color = 'green'
                  $label = '限'
                  break
                case 2 :
                  $color = 'blue'
                  $label = '送'
                  break
                default :
                  $color = 'gray'
                  $label = '休'
                  break
              }
              marker = new SimpleMarker({
                // 前景文字
                iconLabel: {
                  innerHTML: `<span>${$label}</span>`,
                  style: {
                    color: '#fff'
                  }
                },
                // 图标主题
                iconTheme: 'default',
                // 背景图标样式
                iconStyle: $color,
                // ...其他Marker选项...，不包括content
                map: map,
                position: [$item.loc.x, $item.loc.y]
              })
              marker.setMap(map)
              function openInfoWin ($data) {
                var $workStatus = ''
                var $orders = ''
                switch ($data.workStatus) {
                  case 3 :
                    $workStatus = '禁止接单'
                    break
                  case 2 :
                    $workStatus = '配送中'
                    break
                  default :
                    $workStatus = '休息中'
                    break
                }
                if ($data.orders.length > 0) {
                  $data.orders.forEach(($orderItem, $orderIndex) => {
                    $orders += `<a href="#/order/orderDetails?orderId=${$orderItem.orderId}">${$orderItem.orderNo}</a>`
                  })
                } else {
                  $orders = '暂无订单'
                }
                infoWindow = new SimpleInfoWindow({
                  // 模板, underscore
                  infoTitle: `<strong>${$data.realName}</strong>`,
                  infoBody:
                  `<P><span>手机：</span><span>${$data.phone}</span></P>` +
                  `<p><span>等级：</span><span>${$data.level}</span></p>` +
                  `<p><span>当前状态：</span><span>${$workStatus}</span>(${$item.limitText})</p>` +
                  `<p><span>当前订单：</span><span>${$orders}</span></p>`,
                  // 基点指向marker的头部位置
                  offset: new AMap.Pixel(0, -31)
                }).open(map, marker.getPosition())
                map.on('click', function (e) {
                  map.clearInfoWindow()
                })
              }

              // marker 点击时打开
              AMap.event.addListener(marker, 'click', function () {
                apiTable.data_personMapInfo({
                  id: $item.id
                }).then((response) => {
                  if (response.data.code === 1) {
                    openInfoWin(response.data.dat)
                  }
                })
              })
            })
          }
          AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
          })
        })
      },
      data_table ($params) {
        apiTable.data_personMapTable($params).then((response) => {
          if (response.data.code === 1) {
            this.mapData = response.data.dat
            map.remove(marker)
            if ($params.change === 1) {
              this.defaultInit()
            }
            this.init()
          }
        })
      },
      fetch_Data ($id) {
        let self = this
        apiTable.data_personMapInfo({
          id: $id
        }).then((response) => {
          if (response.data.code === 1) {
            self.personInfoData = response.data.dat
          }
        })
      }
    },
    watch: {
      mapData () {
        if (this.defaultInitStatus) {
          this.defaultInit()
        }
      },
      country () {
        this.change = 1
        this.fetch_mapData()
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(setTime)
      next()
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .person-map {
    .el-tree {
      height: 600px;
      overflow-y: auto;
      border: 1px #ddd solid;
      border-radius: 4px;
    }
    .country-select {
      margin-bottom: 20px;
      span {
        color: #666;
      }
    }
    .map-box-card {
      margin-bottom: 20px;
      .card-content {
        display: flex;
        .card-item {
          width: 200px;
          display: table;
          box-sizing: border-box;
          padding: 5px 20px;
          label {
            display: table-cell;
            vertical-align: middle;
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
    .map-box-content {
      width: 100%;
      display: flex;
      border-radius: 5px;
      .box-content-win {
        width: 100%;
        overflow: hidden;
        background: #fff;
        margin-bottom: 20px;
        > div {
          width: 100%;
          height: 600px;
          border-radius: 4px;
          margin-right: 20px;
        }
      }
      .box-content-info {
        width: 280px;
        height: 300px;
        background: #c2e1f7;
        color: #012b6b;
        h5 {
          padding: 20px 0 20px 20px;
          font-size: 18px;
          position: relative;
          font-weight: normal;
          &::before {
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
        .info-item {
          display: table;
          padding: 5px 10px;
          overflow: hidden;
          vertical-align: middle;
          label {
            width: 100px;
            display: table-cell;
          }
          span {
            display: block;
          }
        }
      }
    }
  }
</style>
