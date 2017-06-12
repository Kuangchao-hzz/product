<template>
  <div class="view-order">
    <div class="order-breadcrumb-group">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>待堆订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" type="text/scss">
.order-breadcrumb-group{
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
