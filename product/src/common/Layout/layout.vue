<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <div class="breadcrumb">
        <v-breadcrumb></v-breadcrumb>
      </div>

      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
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
    background: #5a5050;
    .content{
      margin-left: 250px;
      padding: 20px;
      .breadcrumb{
        padding: 10px 20px;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 5px;
      }
    }
  }
</style>
