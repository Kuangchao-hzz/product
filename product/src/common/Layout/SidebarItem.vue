<template>
  <div>
    <template v-for="item in routes">
      <el-menu-item v-if="!item.children" :index="item.path"><i :class="item.icon" class="menu-icon"></i>{{item.name}}</el-menu-item>
      <el-submenu v-else :index="item.path">
        <template slot="title"><i :class="item.icon" class="menu-icon">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
          <span class="path5"></span>
        </i>
        <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item v-if="child.children" :routes="[child]"></sidebar-item>
          <el-menu-item v-else :index="item.path + '/' + child.path" :class="setOrderStatus(child)"><i :class="child.icon" class="menu-icon small"></i>{{child.name}}</el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'sidebar-item',
    props: {
      routes: {
        type: Array
      }
    },
    mounted () {

    },
    methods: {
      setOrderStatus ($val) {
        if ($val.name === '待推订单' && this.$store.getters.sendOrderStatus) {
          return 'order-abnormal'
        }
        if ($val.name === '待抢订单' && this.$store.getters.pushOrderStatus) {
          return 'order-abnormal'
        }
        if ($val.name === '异常订单' && this.$store.getters.abnormalOrderStatus) {
          return 'order-abnormal'
        }
        if ($val.name === '全部订单' && this.$store.getters.allOrderStatus) {
          return 'order-abnormal'
        }
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .side-bar-warps{
    .order-abnormal{
      color: red !important;
    }
    .order-abnormal.is-active{
      background: #30333e !important;
    }
    .menu-icon{
      font-size: 20px;
      position: relative;
      top: 2px;
      &.icon-japan{
        margin: 0;
      }
      &.icon--early-warning{
        margin: 0;
        position: relative;
        left: -5px;
      }
      &.icon-associated{
        margin: 0;
        position: relative;
        left: -8px;
      }
      &.icon-accounts{
        font-size: 22px;
        position: relative;
        left: -2px;
        margin-right: 4px;
      }
      &.icon-earth-other{
        font-size: 26px;
        margin: 0;
        position: relative;
        top: 4px;
      }
      small{
        font-size: 14px;
      }
    }
    &.el-menu--collapse>.el-menu-item span, &.el-menu--collapse>div>.el-submenu>.el-submenu__title span{
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
    &.el-menu--collapse>.el-menu-item>div.el-submenu__icon-arrow, &.el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
    &.el-menu--collapse>.el-menu-item>div.menu-icon, &.el-menu--collapse>div>.el-submenu>.el-submenu__title .menu-icon {
      margin: 0;
      vertical-align: middle;
    }
    i{
      font-style: normal;
    }
  }
</style>
