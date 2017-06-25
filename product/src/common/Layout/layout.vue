<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <div class="content-content">
        <div>
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
      .content-content{
        padding: 70px 20px 0 270px;
        >div{
          overflow: hidden;
          background: #fff;
          padding: 0 20px 20px 20px;
        }
        .breadcrumb{
          padding: 10px 20px;
          background: #fff;
          margin-bottom: 20px;
          border-bottom: 1px #ddd solid;
        }
      }
    }
  }
</style>
