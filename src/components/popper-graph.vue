<template>
  <popper offset="0,6px">
    <ul slot="content" class="popper-content popper-graph">
      <li v-for="(graph, j) in graphs" :key="j" :class="'kt-icon-'+ graph.name"></li>
    </ul>
    <a class="kt-icon-arrow-28" slot="reference"></a>
  </popper>
</template>

<script>
import popper from './popper'

export default {
  name: 'PopperGraph',
  components: {
    popper
  },
  data () {
    return {
      graphs: [
        { name: 'equilateral', class: 'Triangle' },
        { name: 'right', class: 'Triangle' },
        { name: 'isosceles', class: 'Triangle' },
        { name: 'square', class: 'Rect' },
        { name: 'rectangle', class: 'Rect' },
        { name: 'rhombus', class: 'Rect' },
        { name: 'trapezoid', class: 'Rect' },
        { name: 'circle', class: 'Cirlce' },
        { name: 'semicircle', class: 'Semicircle' },
        { name: 'custom', class: 'Custom' }
      ]
    }
  }
}
</script>
