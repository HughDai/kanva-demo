<template>
  <div class="graph-style-picker">
    <div :class="['kt-icon-fill-' + fill, {'kt-hl': mode === 'fill'}]"
    @click="changeMode('fill')"></div>
    <div :class="['kt-icon-stroke-' + strokeColor, {'kt-hl': mode === 'strokeColor'}]"
    @click="changeMode('strokeColor')"></div>
  </div>
</template>

<script>
export default {
  name: 'GraphStyle',
  props: {
    fill: {
      type: String,
      default: 'blank'
    },
    strokeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      mode: 'strokeColor',
      colors: [ 'blank', 'black', 'blue', 'red', 'white', 'yellow', 'lightblue']
    }
  },
  methods: {
    changeMode (mode) {
      this.mode = mode
      // this.$store.CHANGE_SETTINGS({ key: this.mode, value: val })
    }
  }
}
</script>
