<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content">
      <v-sidebar></v-sidebar>
      <div class="container">
        <div :style="containerHeight">
          <div class="breadcrumb">
            <v-breadcrumb></v-breadcrumb>
          </div>
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
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
        return {
          height: (this.$store.state.include.tableHeight - 90) + 'px',
          overflow: this.$route.path === '/order/orderDetails' ? 'auto' : 'hidden'
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

<style lang="scss" type="text/scss">
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: auto;
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .container{
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        border-top: 70px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 270px solid transparent;
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
