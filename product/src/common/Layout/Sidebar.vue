<template>
  <div class="sidebar" :style="sidebarStyle">
    <div class="zoom-sideBar" @click="toggleSideBar"></div>
    <el-menu theme="dark"
             :unique-opened="true"
             :default-active="realTime_currentPath"
             :collapse="isCollapse"
             :default-openeds="[]"
             class="side-bar-warps"
             ref="elMenu"
             router>
      <sidebarItem :routes="routes"></sidebarItem>
    </el-menu>
  </div>
</template>

<script>
  import sidebarItem from './SidebarItem'
  export default {
    data () {
      return {
        routes: this.$store.getters.addRouters,
        currentPath: this.$route.path,
        isCollapse: false
      }
    },
    computed: {
      realTime_currentPath () {
        return this.currentPath
      },
      sidebarStyle () {
        return {
          height: (this.$store.state.include.tableHeight - 50) + 'px'
        }
      }
    },
    mounted () {
    },
    methods: {
      toggleSideBar () {
        this.isCollapse = !this.isCollapse
      }
    },
    watch: {
      isCollapse () {
        if (this.isCollapse) {
          this.currentPath = '/aaa'
          this.$store.dispatch('captureBrowserSize', 64)
        } else {
          this.currentPath = this.$route.path
          this.$store.dispatch('captureBrowserSize', 240)
        }
      }
    },
    components: {
      sidebarItem
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .sidebar{
    background-color: #324157;
    position: relative;
    z-index: 999;
    .el-menu{
      width: 250px;
      min-width: 250px;
      &.el-menu--collapse{
        width: 64px;
        min-width: 64px;
      }
    }
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
    .zoom-sideBar{
      width: 8px;
      height: 70px;
      display: block;
      background: #324157;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-left: 1px #666 solid;
      cursor: pointer;
      opacity: 0;
      transition: all .5s;
      position: absolute;
      right: -20px;
      top: 80%;
      transform: translateY(-50%);
      &::before{
        content: '〈';
        display: block;
        color: #fff;
        font-size: 12px;
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &:hover{
        opacity: 1;
        right: -8px;
      }
    }
    &:hover{
      .zoom-sideBar{
        opacity: 1;
        right: -8px;
      }
    }
  }
</style>
