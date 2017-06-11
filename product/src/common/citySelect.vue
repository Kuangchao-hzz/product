<template>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    :change-on-select=true
    @active-item-change=""
  ></el-cascader>
</template>

<script>
  export default {
    data () {
      return {
        options: [{
          value: 'zhinan',
          label: '上海',
          children: [{
            value: 'baoshan',
            label: '宝山区',
            children: [{
              value: 'yizhi',
              label: 'XXXX'
            }, {
              value: 'fankui',
              label: 'XXXX'
            }, {
              value: 'xiaolv',
              label: 'XXXX'
            }, {
              value: 'kekong',
              label: 'XXXX'
            }]
          }, {
            value: 'daohang',
            label: '黄埔区',
            children: [{
              value: 'cexiangdaohang',
              label: 'XXX'
            }, {
              value: 'dingbudaohang',
              label: 'XXX'
            }]
          }]
        }],
        selectedOptions: ['zujian', 'data', 'tag']
      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
