<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes"
             @open="handleOpen"
             @close="handleClose"
             class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'el-icon-menu',
            index: '2',
            title: '数据统计',
            subs: [
              {
                index: '/delivery/delivery',
                title: '配送统计'
              },
              {
                index: '/delivery/people',
                title: '配送员统计'
              }
            ]
          },
          {
            icon: 'el-icon-date',
            index: '3',
            title: '订单管理',
            subs: [
              {
                index: '/order/waitSendOrder',
                title: '待推订单'
              },
              {
                index: '/order/waitPushOrder',
                title: '待抢订单'
              },
              {
                index: '/order/abnormalOrder',
                title: '异常订单'
              },
              {
                index: '/order/allOrder',
                title: '全部订单'
              }
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: '4',
            title: '配送员管理',
            subs: [
              {
                index: '/person/map',
                title: '配送地图'
              },
              {
                index: '/person/manage',
                title: '配送员管理'
              },
              {
                index: '/person/audit',
                title: '资格审核'
              },
              {
                index: '/person/money',
                title: '财务结算'
              }
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: '5',
            title: '配送管理',
            subs: [
              {
                index: '/delivery/store',
                title: '门店管理'
              },
              {
                index: '/delivery/money',
                title: '费用设置'
              },
              {
                index: '/delivery/level',
                title: '配送等级设置'
              },
              {
                index: '/delivery/rule',
                title: '推送规则设置'
              }
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: '6',
            title: '系统设置',
            subs: [
              {
                index: '/system/notice',
                title: '公告管理'
              },
              {
                index: '/system/user',
                title: '用户管理'
              },
              {
                index: '/system/role',
                title: '角色管理'
              },
              {
                index: '/system/staff',
                title: '员工排班管理'
              },
              {
                index: '/system/service',
                title: '客服管理'
              },
              {
                index: '/system/app',
                title: 'APP版本管理'
              },
              {
                index: '/system/help',
                title: '使用帮助'
              }
            ]
          }
        ]
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path
      }
    },
    methods: {
      handleOpen (key, keyPath) {

      },
      handleClose (key, keyPath) {

      }
    }
  }
</script>


<style lang="scss" type="text/scss">
  .sidebar{
    display: table-cell;
    width: 250px;
    bottom:0;
    z-index: 1;
    background: #FFF;
    .el-submenu{
      background: #fff;
    }
    > ul {
      height:100%;
    }
  }
</style>
