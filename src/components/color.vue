<template>
  <ul class="stroke-color-picker">
    <template v-for="i in colors">
      <li :key="i" v-if="i !== 'blank'"
      :class="['kt-icon-color-' + i + (value === i ? '-hl' : '')]"
      @click="onClick(i)"></li>
      <li :key="i" v-else v-show="mode === 'fill'"
      :class="['kt-icon-color-blank' + (value === i ? '-hl' : '')]"
      @click="onClick('blank')"></li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'Color',
  props: {
    mode: {
      type: String,
      default: 'stroke' // stroke fill
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
      let state = { currentColor: val }
      state[this.mode] = val
      this.$store.commit('setState', state)
    }
  }
}
</script>
