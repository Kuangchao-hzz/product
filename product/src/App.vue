<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" type="text/scss">
  @import "../static/css/reset.css";
  html,body,#app{
    width: 100%;
    height: 100%;
    color: #48576a;
    .country-select{
      color: #fff;
    }
    .search-table{
      .el-col{
        >div{
          width: 100%;
          >div{
            width: 100%;
            >div{
              width: 100%;
            }
          }
        }
      }
    }

    .content-table-pagination{
      .el-pagination{
        float: right;
        .el-pagination__total{
          color: #fff;
        }
        .el-pagination__jump{
          color: #fff;
          input{
            color: #666;
          }
        }
      }
    }
  }
</style>
