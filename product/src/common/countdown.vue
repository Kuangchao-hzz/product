<template>
  <div>
    <div :class="{loading: start}">{{time | change}}</div>
  </div>
</template>

<script>
  let flag = false
  export default {
    data () {
      return {
        time: '获取验证码'
      }
    },
    props: {
      start: {
        type: Boolean
      }
    },
    watch: {
      start (value, oldvalue) {
        if (value === true) {
          this.countDown()
        } else {

        }
      }
    },
    methods: {
      countDown () {
        this.time = 60
        let time = setInterval(() => {
          this.time --
          if (this.time === 0) {
            this.$emit('countDown')
            this.time = '获取验证码'
            flag = true
            clearInterval(time)
          }
        }, 1000)
      }
    },
    filters: {
      change (value) {
        if (!value) return ''
        if (!isNaN(value)) {
          if (flag === true) {
            return `重新发送${value}S`
          }
          return value + 'S'
        } else {
          return value
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .loading{
    color: #ddd;
  }
</style>
