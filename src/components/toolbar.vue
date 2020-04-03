<template>
  <div class="kt-container">
    <aside class="left-side">
      <ul class="kt-selector-list">
        <template v-for="(selector, i) in selectorList_1">
          <li :key="i + 'li'" 
          :class="['kt-selector', 'kt-icon-'+ selector, {'kt-icon-square graph-checked': i === 4}]"></li>
          <popper offset="0,6px" v-if="i === 4"  :key="i + 'popper'">
            <ul slot="content" class="popper-content popper-graph">
              <li v-for="(graph, j) in graphs" :key="j" :class="'kt-icon-'+ graph.name"></li>
            </ul>
            <a class="kt-icon-arrow-28" slot="reference"></a>
          </popper>
        </template>
      </ul>
      <i class="kt-separator"></i>
    </aside>
    <div class="middle-side">
      <board-style></board-style>
      <stroke-width></stroke-width>
      <line-style></line-style>
      <eraser-width></eraser-width>
      <graph-style></graph-style>
      <stroke-color></stroke-color>
    </div>
    <aside class="right-side">
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li v-for="(selector, i) in selectorList_2" :key="i"
        :class="['kt-selector', 'kt-icon-'+ selector]"></li>
      </ul>
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li slot="reference" class="kt-selector kt-icon-reset"></li>
        <popper offset="0,6px">
          <ul slot="content" class="popper-content popper-countdown">
            <li>15s</li>
            <li>30s</li>
            <li>60s</li>
          </ul>
          <li slot="reference" class="kt-selector kt-icon-countdown"></li>
        </popper>
      </ul>
    </aside>
    <!-- <board></board> -->
  </div>
</template>

<script>
import popper from './popper'
import strokeWidth from './stroke-width'
import eraserWidth from './eraser-width'
import lineStyle from './line-style'
import boardStyle from './board-style'
import strokeColor from './stroke-color'
import graphStyle from './graph-style'
// import board from './board'

export default {
  name: 'Toolbar',
  components: {
    popper,
    // board,
    strokeWidth,
    eraserWidth,
    lineStyle,
    boardStyle,
    strokeColor,
    graphStyle
  },
  data () {
    return {
      selectorList_1: [
        'mouse', 'brush', 'eraser', 'line', 'square', 'whiteboard'
      ],
      selectorList_2: [
        'remove', 'clear', 'undo', 'redo'
      ],
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

<style lang="scss">
@import "../assets/styles/toolbar.scss";
</style>
