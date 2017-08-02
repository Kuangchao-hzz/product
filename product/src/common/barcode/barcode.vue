<template>
  <div class="barcode-group">
    <svg class="vue-barcode-element" v-show="valid"></svg>
  </div>
</template>

<script>
  import JsBarcode from 'JsBarcode'
  export default {
    name: 'barcode',
    data () {
      return {
        valid: true
      }
    },
    props: {
      value: [String, Number],
      format: [String],
      width: [String, Number],
      height: [String, Number],
      text: [String, Number],
      fontOptions: [String],
      font: [String],
      textAlign: [String],
      textPosition: [String],
      textMargin: [String, Number],
      fontSize: [String, Number],
      background: [String],
      lineColor: [String],
      margin: [String, Number],
      marginTop: [String, Number],
      marginBottom: [String, Number],
      marginLeft: [String, Number],
      marginRight: [String, Number]
    },
    mounted: function () {
      this.$watch('$props', render, { deep: true, immediate: true })
      render.call(this)
    }
  }

  function render () {
    JsBarcode(this.$el.querySelector('.vue-barcode-element'), this.value, {
      height: this.height || '50',
      font: this.font || '16',
      text: this.text || '',
      width: this.width || 1,
      background: this.background || '#f1f1f1',
      /*
      format: this.format,
      width: this.width,
      text: this.text,
      fontOptions: this.fontOptions,
      font: this.font,
      textAlign: this.textAlign,
      textPosition: this.textPosition,
      textMargin: this.textMargin,
      fontSize: this.fontSize,
      background: this.background,
      lineColor: this.lineColor,
      margin: this.margin,
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      marginLeft: this.marginLeft,
      marginRight: this.marginRight,
      */
      valid: valid => {
        this.valid = valid
      }
    })
  }
</script>

<style lang="scss" type="text/scss" scope>

</style>
