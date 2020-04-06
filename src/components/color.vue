<template>
  <ul class="stroke-color-picker">
    <li v-for="i in colors" :key="i"
    :class="['kt-icon-color-' + i + (value === i ? '-hl' : '')]"
    @click="onClick(i)"></li>
  </ul>
</template>

<script>
export default {
  name: 'Color',
  props: {
    mode: {
      type: String,
      default: 'strokeColor' // strokeColor fill
    },
    value: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      colors: [ 'blank', 'black', 'blue', 'red', 'white', 'yellow', 'lightblue']
    }
  },
  methods: {
    onClick (val) {
      this.value = val
      // this.$store.CHANGE_SETTINGS({ key: this.mode, value: val })
    }
  }
}
</script>
