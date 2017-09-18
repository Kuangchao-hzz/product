
<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/img/logo.png">
      <i></i>
      <span>后台管理系统</span>
    </div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand" class="el-btn-link">
        <span class="el-dropdown-link">
            {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
          <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import api from '@/api/login'
  export default {
    data () {
      return {
        name: 'admin'
      }
    },
    computed: {
      username () {
        let username = localStorage.getItem('ms_username')
        /* eslint-disable no-unneeded-ternary */
        return username ? username : this.name
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'loginout') {
          localStorage.removeItem('ms_username')
          api.logout_user().then((response) => {
            if (response.data.code === 1) {
              this.$router.push('/login')
            }
          })
        } else if (command === 'editPwd') {
          this.$router.push('/resetPassword')
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
    color: #666;
    background: #fff;
    z-index: 999;
    .logo {
      float: left;
      vertical-align: middle;
      img{
        width: 200px;
        float: left;
        margin-top: 5px;
      }
      i{
        float: left;
        width: 1px;
        height: 20px;
        background: #ddd;
        margin: 0 20px;
        margin-top: 15px;
      }
      span{
        float: left;
      }
    }
    .user-info {
      float: right;
      padding-right: 50px;
      font-size: 16px;
      color: #fff;
      .el-btn-link {
        position: relative;
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
        .el-dropdown-link{
          .user-logo {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .el-logout-link{
          padding-left: 20px;
        }
      }

    }
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
