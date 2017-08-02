<template>
  <div class="sidebar">
    <el-menu theme="dark"
             mode="vertical"
             :unique-opened="true"
             :default-active="this.$route.path"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             class="el-menu-vertical-demo"
             router>
      <sidebarItem :routes="routes"></sidebarItem>
    </el-menu>
  </div>
</template>

<script>
  import sidebarItem from './SidebarItem'
  import { asyncRouterMap } from '../../router/index'
  export default {
    data () {
      return {
        routes: asyncRouterMap,
        isCollapse: true
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    components: {
      sidebarItem
    }
  }
</script>


<style lang="scss" type="text/scss">
  .sidebar{
    width: 250px;
    bottom:0;
    z-index: 1;
    background: #2a2c36;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 70px;
    .el-submenu{
      background: #2a2c36;
      div.el-submenu__title{
        color: #fff;
        &:hover{
          background: #30333e;
        }
      }
      ul.el-menu{
        background: #2a2c36;
        li.el-menu-item{
          color: #fff;
          &.is-active{
            color: #20a0ff;
          }
          &:hover{
            background: #30333e;
          }
        }
      }
    }
  }
</style>
