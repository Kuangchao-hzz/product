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
  @import "../static/css/global";
  html,body,#app{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    width: 100%;
    background: #ddd;
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
      .country-select{
        width: 100%;
        >div, span{
          width: 100%;
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
