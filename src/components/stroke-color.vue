<template>
  <ul class="stroke-color-picker">
    <li v-for="(color, i) in colors" :key="i"
    :class="['kt-icon-color-' + color + (selected === i ? '-hl' : '')]"></li>
  </ul>
</template>

<script>
export default {
  name: 'StrokeColor',
  data () {
    return {
      selected: 0,
      colors: [ 'blank', 'black', 'blue', 'red', 'white', 'yellow', 'lightblue']
    }
  }
}
</script>
