<template>
  <div class="multipleColumn">
    <div class="main"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        legendArr: [],
        styleArr: [],
        myChart: {},
        name: '复杂柱状图'
      }
    },
    methods: {
      _init () {
        this.legendArr = this.myChart.getOption().series
        this.legendArr.forEach((data) => {
          data.selected = true
        })
        window.addEventListener('resize', function () {
          this.myChart.resize()
        }.bind(this))
      }
    },
    mounted () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.querySelector('.multipleColumn .main'))
      this.myChart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: `{a} <br/>{b} : {c} ({d}%)`
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      })
      this._init()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .multipleColumn{
    height: 500px;
    margin-top: 20px;
    border: 1px #ddd solid;
    .main{
      height:100%;
    }
  }
</style>
