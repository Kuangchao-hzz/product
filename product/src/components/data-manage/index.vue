<template>
  <div class="view-delivery">
    <header>
      <span>区域: </span>
      <citySelect></citySelect>
    </header>
    <div class="container-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import citySelect from '@/common/citySelect'
  export default {
    components: {
      citySelect
    }
  }
</script>

<style lang="scss" type="text/scss">
  .view-delivery{
    width: 100%;
    header{
      color: #fff;
    }
    .container-body{
      position: relative;
      margin-top: 20px;
    }

  }
</style>
