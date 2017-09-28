<template>
  <div id="app">
    <router-view></router-view>
    <resetLogin></resetLogin>
    <div class="copyright-box">
      © 2017 Carrefour China Inc.All
    </div>
  </div>
</template>

<script>
import resetLogin from './components/include/reset-login.vue'
export default {
  name: 'app',
  data () {
    return {
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth
    }
  },
  methods: {

  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight
        window.screenWidth = window.innerWidth
        that.screenHeight = window.screenHeight
        that.screenWidth = window.screenWidth
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
  components: {
    resetLogin
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.timer = true
        let that = this
        that.timer = false
        setTimeout(function () {
          if (that.$store.state.include.sidebarStatus) {
            that.$store.dispatch('captureBrowserSize', 64)
          } else {
            that.$store.dispatch('captureBrowserSize', 240)
          }
        }, 300)
      }
    },
    screenWidth (val) {
      if (!this.timer) {
        this.timer = true
        let that = this
        that.timer = false
        setTimeout(function () {
          if (that.$store.state.include.sidebarStatus) {
            that.$store.dispatch('captureBrowserSize', 64)
          } else {
            that.$store.dispatch('captureBrowserSize', 240)
          }
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "../static/css/reset.css";
  @import "../static/css/global";
  @import "./assets/font/menu-icon.css";
  html,body,#app{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    width: 100%;
    height: 100%;
    background: #ddd;
    overflow: hidden;
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
    .swal2-container{
      z-index: 3000;
    }
    .el-message{
      top: 50%;
    }
  }
  .copyright-box{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  html .swal2-container, body .swal2-container, #app .swal2-container{
    z-index: 1000000;
  }
</style>
