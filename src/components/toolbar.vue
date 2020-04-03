<template>
  <div class="kt-container">
    <aside class="kt-tools">
      <ul class="kt-selector-list">
        <template v-for="(selector, i) in tools">
          <li :key="i + 'li'" 
          :class="[
            'kt-selector', 'kt-icon-'+ selector, {'graph-checked': i === 4}
          ]"></li>
          <popper-graph v-if="i === 4" :key="i + 'popper'"></popper-graph>
        </template>
      </ul>
      <i class="kt-separator"></i>
    </aside>
    <div class="kt-settings">
      <board-style></board-style>
      <stroke-width></stroke-width>
      <line-style></line-style>
      <eraser-width></eraser-width>
      <graph-style></graph-style>
      <stroke-color></stroke-color>
    </div>
    <aside class="kt-operations">
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <template v-for="(operation, i) in operations">
          <li :key="i" :class="['kt-selector', 'kt-icon-' + operation]"></li>
          <i class="kt-separator" v-if="i === 3" :key="i"></i>
        </template>
        <popper-countdown></popper-countdown>
      </ul>
    </aside>
    <!-- <board></board> -->
  </div>
</template>

<script>
import strokeWidth from './stroke-width'
import eraserWidth from './eraser-width'
import lineStyle from './line-style'
import boardStyle from './board-style'
import strokeColor from './stroke-color'
import graphStyle from './graph-style'
import popperCountdown from './popper-countdown'
import popperGraph from './popper-graph'
// import board from './board'

export default {
  name: 'Toolbar',
  components: {
    // popper,
    // board,
    strokeWidth,
    eraserWidth,
    lineStyle,
    boardStyle,
    strokeColor,
    graphStyle,
    popperCountdown,
    popperGraph
  },
  data () {
    return {
      tools: ['mouse', 'brush', 'eraser', 'line', 'square', 'whiteboard'],
      operations: ['remove', 'clear', 'undo', 'redo', 'reset']
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/toolbar.scss";
</style>
