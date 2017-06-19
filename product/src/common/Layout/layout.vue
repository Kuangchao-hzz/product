<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content">
      <v-sidebar></v-sidebar>
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
    background: #ddd;
    overflow: auto;
    .content{
      width: 1300px;
      min-height: 100%;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 70px;
      display: table;
      .content-content{
        width: 98%;
        display: table-cell;
        float: right;
        background: #fff;
        >div{
          padding: 20px;
          overflow: hidden;
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
