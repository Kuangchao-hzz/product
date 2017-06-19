<template>
  <div class="view-delivery">
    <div class="container-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" type="text/scss">
  .view-delivery{
    width: 100%;
    header{
      color: #fff;
      margin-bottom: 20px;
    }
    .container-body{
      position: relative;
    }
  }
</style>
