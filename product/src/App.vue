<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      screenHeight: window.innerHeight
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight
        that.screenHeight = window.screenHeight
      })()
    }
    /* eslint-disable no-extend-native */
    Date.prototype.Format = function (format) {
      var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      }
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) if (new RegExp('(' + k + ')').test(format))format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return format
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.timer = true
        let that = this
        that.timer = false
        setTimeout(function () {
          that.$store.dispatch('captureBrowserSize')
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  @import "../static/css/reset.css";
  @import "../static/css/global";
  @import "./assets/font/menu-icon.css";
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
      }
    }
    .el-table--fit td.gutter, .el-table--fit th.gutter{
      border-right-width: 0px;
    }
    .swal2-container{
      z-index: 3000;
    }
  }
</style>
