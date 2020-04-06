<template>
  <div class="kt-container">
    <div class="kt-main" v-show="visible">
      <aside class="kt-tools">
        <ul class="kt-selector-list">
          <template v-for="(selector, i) in tools">
            <li :key="i + 'li'" v-if="i !== 4"
            :class="['kt-selector', 'kt-icon-'+ selector]"></li>
            <template v-else>
              <li :class="['kt-selector', 'graph-checked', 'kt-icon-'+ selectedGraph]" :key="i"></li>
              <popper-graph :key="i + 'popper'"></popper-graph>
            </template>
          </template>
        </ul>
        <i class="kt-separator"></i>
      </aside>
      <div class="kt-settings">
        <board-style></board-style>
        <stroke-width></stroke-width>
        <line-style></line-style>
        <eraser-style @change="handleEraserWidthChanged" :value="eraserWidth"></eraser-style>
        <graph-style></graph-style>
        <color></color>
      </div>
      <aside class="kt-operations">
        <i class="kt-separator"></i>
        <ul class="kt-selector-list">
          <template v-for="(operation, i) in operations">
            <li :key="i" :class="['kt-selector', 'kt-icon-' + operation]"></li>
            <i class="kt-separator" v-if="i === 3" :key="i+'separator'"></i>
          </template>
          <popper-countdown></popper-countdown>
        </ul>
      </aside>
    </div>
    <i :class="['kt-arrow', 'kt-arrow-' + (visible ? 'collapse' : 'expand')]"
    @click="handleVisible"></i>
  </div>
</template>

<script>
import strokeWidth from './stroke-width'
import eraserStyle from './eraser-style'
import lineStyle from './line-style'
import boardStyle from './board-style'
import color from './color'
import graphStyle from './graph-style'
import popperCountdown from './popper-countdown'
import popperGraph from './popper-graph'
// import board from './board'

export default {
  name: 'Toolbar',
  components: {
    strokeWidth,
    eraserStyle,
    lineStyle,
    boardStyle,
    color,
    graphStyle,
    popperCountdown,
    popperGraph
  },
  data () {
    return {
      currentMode: 'mouse',
      selectedIcon: '',
      selectedGraph: 'square',
      selectedLineWidth: 'medeium',
      selectedLineStyle: 'solid',
      seletedBoard: '',
      eraserWidth: 'medium',
      visible: true,
      settings: {
        stroke: '',
        strokeWidth: '',
        fill: '',
        dashEnabled: false
      },
      // 状态控制中间settings显示
      modes: ['mouse', 'brush', 'eraser', 'line', 'graph', 'whiteboard', 'countdown'],
      // 左侧
      tools: ['mouse', 'brush', 'eraser', 'line', 'graph', 'whiteboard'],
      // 右侧
      operations: ['remove', 'clear', 'undo', 'redo', 'reset']
    }
  },
  methods: {
    handleVisible () {
      this.visible = !this.visible
    },
    handleEraserWidthChanged (width) {
      console.log(width)
      this.eraserWidth = width
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/toolbar.scss";
</style>
