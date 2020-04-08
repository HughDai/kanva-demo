<template>
  <div class="graph-style-picker">
    <div :class="['kt-icon-fill-' + fill, {'kt-hl': mode === 'fill'}]"
    @click="changeMode('fill')"></div>
    <div :class="['kt-icon-stroke-' + stroke, {'kt-hl': mode === 'stroke'}]"
    @click="changeMode('stroke')"></div>
  </div>
</template>

<script>
export default {
  name: 'GraphStyle',
  props: {
    mode: {
      type: String,
      default: 'stroke'
    },
    fill: String,
    stroke: String
  },
  data () {
    return {
      colors: [ 'blank', 'black', 'blue', 'red', 'white', 'yellow', 'lightblue']
    }
  },
  methods: {
    changeMode (val) {
      let currentColor = val === 'fill' ? this.fill : this.stroke
      this.$store.commit('setState', { graphStyleMode: val, currentColor })
    }
  }
}
</script>
