<template>
  <div id="container" style="z-index: 31;"></div>
</template>

<script>
/* eslint-disable */
const CAN_DRAW_MODE = ['brush', 'eraser', 'line', 'graph']

import Line from '@/elements/line'
import { mapState } from 'vuex'
import { STROKE_WIDTH_ENUMS, ERASER_WIDTH_ENUMS, COLOR_ENUMS, GRAPH_CLASSES } from '@/elements/constants'
import { TriangleSceneFunc, RectSceneFunc, PolygonSceneFunc, CustomLayer } from '@/elements/util'

export default {
  name: 'Stage',
  props: {
    mode: String
  },
  data () {
    return {
      stage: {},
      customLayer: {},
      brushLayer: {},
      stageHistory: [],
      stageHistoryStep: 0,
      currentInstance: {}
    }
  },
  watch: {
    graphConfig: {
      handler (nV, oV) {
        console.log(nV)
        this.createInstance()
      },
      deep: true
    },
    settingConfig: {
      handler (nV, oV) {
        console.log(nV)
        this.createInstance()
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      'currentMode', 'graphStyleMode', 'selectedGraph', 'graphClass', 'lineStyle',
      'currentColor', 'eraserWidth', 'stroke',
      'strokeWidth', 'fill', 'dashEnabled'
    ]),
    settingConfig () {
      return {
        fill: COLOR_ENUMS[this.fill],
        stroke: COLOR_ENUMS[this.stroke],
        strokeWidth: this.currentMode === 'eraser'
          ? ERASER_WIDTH_ENUMS[this.eraserWidth]
          : STROKE_WIDTH_ENUMS[this.strokeWidth],
        dashEnabled: this.lineStyle === 'dash',
      }
    },
    graphConfig () {
      return {
        currentMode: this.currentMode,
        selectedGraph: this.selectedGraph,
        graphClass: this. graphClass
      }
    }
  },
  mounted () {
    this.stage = new Konva.Stage({
      container: 'container',
      width: 800,
      height: 600
    })
    this.customLayer = new CustomLayer({ name: 'customLayer' })
    this.stage.add(this.customLayer)

    this.brushLayer = new Konva.Layer({ name: 'brushLayer' })
    this.stage.add(this.brushLayer)

    this.initHistory(this.stage.toJSON())

    this.attachStageEvents()
  },
  methods: {
    createInstance () {
      this.detachDrawEvents()
      this.attachStageEvents()
      if (!CAN_DRAW_MODE.includes(this.currentMode)) return
      let isBrushMode = this.currentMode === 'brush' || this.currentMode === 'eraser'
      let mode = this.selectedGraph.indexOf('circle') > -1 ? 'center' : this.selectedGraph
      const config = {
        mode,
        ...this.settingConfig,
        layer: isBrushMode ? this.brushLayer : this.customLayer,
        callback: function () {
          this.detachDrawEvents()
          this.attachStageEvents()
        }
      }
      if (isBrushMode) {
        config.mode = this.currentMode
        this.customLayer.hitGraphEnabled(false)
        this.brushLayer.hitGraphEnabled(true)
      } else {
        this.customLayer.hitGraphEnabled(true)
        this.brushLayer.hitGraphEnabled(false)
      }

      let className = (this.graphClass || this.currentMode).replace(/\w/, m => m.toUpperCase())
      className = isBrushMode ? 'Brush' : className
      let klass = GRAPH_CLASSES[className]
      this.currentInstance = new klass(config)
    },
    attachStageEvents () {
      this.stage.on('click tap', e => {
        console.log(this.customLayer.children.length)
        let target = e.target
        if (target === this.stage) {
          console.log('-------target is stage---------')
          this.customLayer.selectedElement = null
          this.stage.find('Transformer').destroy()
          this.stage.find('.lineAnchor').destroy()
          this.customLayer.draw()
          this.preview()
          return
        } else if (target.hasName('straightLine') || target.hasName('lineAnchor')) {
          // e.evt.cancelBubble = true
          target = target.getParent()
          Line.addAnchors(target)
          this.customLayer.selectedElement = target
          return
        } else if (target.hasName('line')) {
          e.evt.cancelBubble = true
          return
        } else if (target.hasName('circleWithCenter') || target.hasName('circleCenter')) {
          target = target.getParent()
        }

        this.stage.find('Transformer').destroy()

        let tr = new Konva.Transformer({
          rotateAnchorOffset: 20,
          borderDash: [3, 2]
          // enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        })
        this.customLayer.add(tr)
        tr.attachTo(target)
        this.customLayer.draw()
        console.log(tr.anchorStroke())
        this.customLayer.selectedElement = target
      })

      this.stage.on('dragmove', e => {
        if (e.target === this.stage) {
          this.handleHistory()
        }
        this.preview()
      })

      this.stage.on('mouseup touchend dragend', e => {
        console.log(e.target)
        this.handleHistory()
      })
    },
    detachDrawEvents () {
      this.stage.off('mousedown touchstart mouseup touchend mousemove touchmove')
    },
    reload () {
      const lastStageJSON = this.stageHistory[this.stageHistoryStep]
      // console.log('stage object ---- ', this.stage.toObject())
      // console.log('lastStageJSON reload ----- ', lastStageJSON)
      const stageObj = JSON.parse(lastStageJSON)
      let customLayerData = stageObj.children[0]
      let brushLayerData = stageObj.children[1]

      this.customLayer.destroyChildren()
      customLayerData.children.forEach(child => {
        let node = Konva.Node.create(child)
        this.customLayer.add(node)
      })
      this.redrawWithSceneFunc(this.customLayer)
      this.customLayer.batchDraw()

      this.brushLayer.destroyChildren()
      brushLayerData.children.forEach(child => {
        let node = Konva.Node.create(child)
        this.customLayer.add(node)
      })
      this.customLayer.batchDraw()
      this.brushLayer.batchDraw()
    },
    remove () {
      const element = this.customLayer.selectedElement
      console.log(element)
      if (element === null) {
        alert('please select one graph')
        return
      }
      element.remove()
      this.stage.find('Transformer').destroy()
      this.customLayer.draw()
      this.preview()
    },
    clear () {
      this.stage.fire('click')
      let layers = this.stage.find('Layer')
      console.log(layers)
      layers.forEach(l => {
        l.removeChildren()
        l.draw()
      })
      this.preview()
    },
    preview () {

    },
    redrawWithSceneFunc (stage) {
      let triangleShapes = stage.find('.right, .isosceles, .equilateral')
      let rectShapes = stage.find('.rhombus, .trapezoid')
      let customShapes = stage.find('.custom')

      if (triangleShapes.length > 0) {
        triangleShapes.forEach(shape => {
          shape.sceneFunc((context, s) => {
            TriangleSceneFunc[shape.name()](context, s)
          })
        })
      }
      if (rectShapes.length > 0) {
        rectShapes.forEach(shape => {
          shape.sceneFunc((context, s) => {
            RectSceneFunc[shape.name()](context, s)
          })
        })
      }
      if (customShapes.length > 0) {
        customShapes.forEach(shape => {
          console.log(shape)
          shape.sceneFunc((context, s) => {
            PolygonSceneFunc.custom(context, s)
          })
        })
      }
    },
    handleHistory () {
      const stageJSON = this.stage.toJSON()
      const lastStageJSON = this.stageHistory[this.stageHistoryStep]
      // console.log('stagejson====', stageJSON)
      // console.log('laststagejson====', lastStageJSON)
      console.log(stageJSON !== lastStageJSON)
      if (stageJSON !== lastStageJSON) {
        this.pushHistory(stageJSON)
      }
    },
    initHistory (payload) {
      this.stageHistory.push(payload)
      this.stageHistoryStep = 0
    },
    pushHistory (payload) {
      this.stageHistory.push(payload)
      this.stageHistoryStep += 1
    },
    clearHistory () {
      this.stageHistory = []
      this.stageHistoryStep = 0
    },
    redo () {
      if (this.stageHistoryStep === this.stageHistory.length - 1) return
      this.stageHistoryStep += 1
      this.reload()
    },
    undo () {
      if (this.stageHistoryStep === 0) return
      this.stageHistoryStep -= 1
      this.reload()
    },
  }
}
</script>
