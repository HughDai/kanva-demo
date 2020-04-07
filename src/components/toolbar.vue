<template>
  <div class="kt-container">
    <div class="kt-main" v-show="visible">
      <aside class="kt-tools">
        <ul class="kt-selector-list">
          <template v-for="(selector, i) in tools">
            <li :key="i + 'li'" v-if="i !== 4"
            :class="['kt-selector', 'kt-icon-'+ selector, {'kt-hl': currentMode === selector}]"
            @click="changeMode(selector)"></li>
            <template v-else>
              <li  :key="i"
              :class="['kt-selector', 'graph-checked', 'kt-icon-'+ selectedGraph, {'kt-hl': currentMode === 'graph'}]"
              @click="changeMode('graph')"></li>
              <popper-graph :key="i + 'popper'" :value="selectedGraph"></popper-graph>
            </template>
          </template>
        </ul>
        <i class="kt-separator"></i>
      </aside>
      <div class="kt-settings" v-show="showSettings">
        <board-style v-show="showBoardStyle"></board-style>
        <stroke-width v-show="showLineWidth"></stroke-width>
        <line-style v-show="showLineStyle"></line-style>
        <eraser-style v-show="showEraserSetting" :value="eraserWidth"></eraser-style>
        <graph-style v-show="showGraphSetting" :mode="graphStyleMode"
        :fill="fill || 'blank'" :stroke="stroke || 'red'"></graph-style>
        <color v-show="showColor" :value="currentColor" :mode="graphStyleMode"></color>
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
    <ul class="board-pagination">
      <li v-for="(style, i) in boards" :key="i" 
      :class="{'hl': currentBoardPage === i + 1}"
      @click="changeBoardPage(i)">{{i + 1}}</li>
    </ul>
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
import { mapState } from 'vuex'

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
      visible: true,
      currentBoardPage: 0,
      boards: [
        { style: 'white' },
        { style: 'black' },
        { style: 'english' }
      ],
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
  computed: {
    ...mapState([
      'currentMode', 'graphStyleMode', 'selectedGraph', 'lineStyle',
      'currentColor', 'eraserWidth', 'stroke',
      'strokeWidth', 'fill', 'dashEnabled'
    ]),
    showSettings () {
      return this.currentMode !== 'mouse' && this.currentMode !== 'countdown'
    },
    showColor () {
      return ['brush', 'eraser', 'line', 'graph'].includes(this.currentMode)
    },
    showGraphSetting () {
      return this.currentMode === 'graph'
    },
    showEraserSetting () {
      return this.currentMode === 'eraser'
    },
    showLineWidth () {
      return ['brush', 'line', 'graph'].includes(this.currentMode)
    },
    showLineStyle () {
      return this.currentMode === 'line' || this.currentMode === 'graph'
    },
    showBoardStyle () {
      return this.currentMode === 'whiteboard'
    }
  },
  methods: {
    handleVisible () {
      this.visible = !this.visible
    },
    changeBoardPage (page) {
      this.currentBoardPage = page + 1
    },
    changeMode (mode) {
      const state = { currentMode: mode }
      if (mode === 'line') state.graphStyleMode = 'stroke'
      if (mode === 'graph') {
        state.graphClass = state.graphClass || 'Rect'
      } else {
        state.graphClass = ''
      }
      this.$store.commit('CHANGE_STATE', state)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/toolbar.scss";
@import "../assets/styles/popper.scss";
</style>
