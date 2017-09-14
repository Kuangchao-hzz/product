<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content-group">
      <v-sidebar></v-sidebar>
      <div class="container" :style="containerStyle">
        <div :style="containerHeight">
          <div class="breadcrumb">
            <v-breadcrumb></v-breadcrumb>
          </div>
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div></div>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vSidebar from './Sidebar.vue'
  import vBreadcrumb from '../breadcrumb/breadcrumb.vue'
  export default {
    computed: {
      containerHeight () {
        // 设置指定路径下的页面允许滚动
        let autoPagePath = ['/order/orderDetails', '/person/personDetails', '/delivery/level', '/data/delivery', '/system/notice', '/data/people', '/person/map', '/delivery/storeDetails', '/order/waitSendOrder']
        return {
          height: (this.$store.state.include.tableHeight - 110) + 'px',
          overflow: autoPagePath.some((path) => {
            return path === this.$route.path
          }) ? 'auto' : 'hidden'
        }
      },
      containerStyle () {
        return {
          width: (this.$store.state.include.tableWidth) - (this.$store.state.include.sidebarWidth) - 10 + 'px'
        }
      }
    },
    mounted () {

    },
    components: {
      vHead,
      vSidebar,
      vBreadcrumb
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .wrapper{
    width: 100%;
    height: 100%;
    .content-group{
      width: 100%;
      position: relative;
      top: -2px;
      overflow: hidden;
      .sidebar{
        float: left;
      }
      .container{
        float: right;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        border: 20px solid transparent;
        transition: all .5s;
        >div{
          overflow: hidden;
          background: #fff;
          height: 100%;
          padding: 0 20px;
        }
        .breadcrumb{
          padding: 15px 20px;
          background: #fff;
          margin-bottom: 20px;
          border-bottom: 1px #ddd solid;
        }
      }
    }
  }
</style>
