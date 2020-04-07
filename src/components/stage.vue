<template>
  <div id="container" style="z-index: 31;"></div>
</template>

<script>
/* eslint-disable */
const STROKE_WIDTH_ENUMS = {
  'small': 1,
  'medium': 2,
  'large': 3
}
const ERASER_WIDTH_ENUMS = {
  'small': 3,
  'medium': 5,
  'large': 7
}
const COLOR_ENUMS = {
  'blank': '',
  'black': 'black',
  'red': 'red',
  'blue': 'blue',
  'yellow': 'yellow',
  'white': 'white',
  'lightblue': '#01F8FF'
}

import Line from '@/elements/line'
import Brush from '@/elements/brush'
import Circle from '@/elements/circle'
import Semicircle from '@/elements/semicircle'
// import Polygon from '@/elements/polygon'
import Triangle from '@/elements/triangle'
import Rect from '@/elements/rect'
import Custom from '@/elements/custom'
import toolbar from '@/components/toolbar'
import { mapState } from 'vuex'
import { TriangleSceneFunc, RectSceneFunc, PolygonSceneFunc, CustomLayer } from '@/elements/util'

const classes = {
  Line, Brush, Circle, Semicircle, Triangle, Rect, Custom
}

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
    currentMode (nV, oV) {
      if (nV === oV) return
      this.detachDrawEvents()
      this.attachStageEvents()
      if (!['brush', 'eraser', 'line', 'graph'].includes(this.currentMode)) return
      let isBrush = this.currentMode === 'brush' || this.currentMode === 'eraser'
      const config = {
        layer: isBrush ? this.brushLayer : this.customLayer,
        mode: this.selectedGraph,
        ...this.config
      }
      if (this.currentMode === 'brush') config.mode = 'brush'
      let className = (this.graphClass || this.currentMode).replace(/\w/, m => m.toUpperCase())
      console.log(className)
      if (this.currentMode === 'eraser') className = 'Brush'
      let klass = classes[className]
      this.currentInstance = new klass(config)
    }
  },
  computed: {
    ...mapState([
      'currentMode', 'graphStyleMode', 'selectedGraph', 'graphClass', 'lineStyle',
      'currentColor', 'eraserWidth', 'stroke',
      'strokeWidth', 'fill', 'dashEnabled'
    ]),
    config () {
      return {
        fill: COLOR_ENUMS[this.fill],
        stroke: COLOR_ENUMS[this.stroke],
        strokeWidth: this.currentMode === 'eraser'
          ? ERASER_WIDTH_ENUMS[this.eraserWidth]
          : STROKE_WIDTH_ENUMS[this.strokeWidth],
        dashEnabled: this.lineStyle === 'dash',
      }
    }
  },
  mounted () {
    this.stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 750
    })
    this.customLayer = new CustomLayer({ name: 'customLayer' })
    this.stage.add(this.customLayer)

    this.brushLayer = new Konva.Layer({ name: 'brushLayer' })
    this.stage.add(this.brushLayer)

    this.initHistory(this.stage.toJSON())

    this.attachStageEvents()
  },
  methods: {
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

        // e.evt.cancelBubble = true

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
      console.log('stage object ---- ', this.stage.toObject())
      console.log('lastStageJSON reload ----- ', lastStageJSON)
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
    draw (mode) {
      if (!this.isBrushMode) return
      this.detachDrawEvents()
      this.attachStageEvents()
      if (!this.brush) {
        this.brush = new Brush({ layer: this.brushLayer, mode, ...this.config })
      } else {
        this.brush.globalCompositeOperation('destination-out')
      }
    },
    remove () {
      const element = this.customLayer.selectedElement
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
      console.log('stagejson====', stageJSON)
      console.log('laststagejson====', lastStageJSON)
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
