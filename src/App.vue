<template>
  <div id="app">
    <button @click="addRect">四边形</button>
    <select @change="handleRectModeChange">
      <option value="square">正方形</option>
      <option value="rectangle">长方形</option>
      <option value="rhombus">菱形</option>
      <option value="trapezoid">梯形</option>
    </select>
    <button @click="addCustom">任意多边形</button>
    <button @click="quitCustom">退出任意多边形</button>
    <button @click="addPolygon">多边形</button>
    <input type="text" v-model="side" style="width: 15px;">
    <button @click="addTriangle">三角形</button>
    <select @change="handleTriangleModeChange">
      <option value="equilateral">等边</option>
      <option value="right">直角</option>
      <option value="isosceles">等腰</option>
    </select>
    <button @click="addStraight">直线</button>
    <button @click="addCircle">圆</button>
    <button @click="addCircleWithCenter">圆心圆</button>
    <button @click="addSemicircle">半圆</button>
    <button @click="addCenterSemicircle">圆心半圆</button>
    <button @click="draw('brush')">画笔</button>
    <button @click="draw('eraser')">橡皮</button>
    <button @click="handleModeChange">{{isBrushMode ? '退出画笔' : '画笔模式'}}</button>
    <button @click="preview">预览</button>
    <button @click="remove">删除</button>
    <button @click="clear">清屏</button>
    <button @click="undo">撤销</button>
    <button @click="redo">重做</button>
    <label>填充</label>
    <select @change="handleFillChange">
      <option value="">空心</option>
      <option value="red">红色</option>
    </select>
    <label>描边</label>
    <select @change="handleStrokeChange">
      <option value="red">红色</option>
      <option value="black">黑色</option>
    </select>
    <label>虚实线</label>
    <select @change="handleDashChange">
      <option value="0">实线</option>
      <option value="1">虚线</option>
    </select>
    <label>线宽</label>
    <select @change="handleStrokeWidthChange">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
    <br><br><br>
    <div id="toolbar-wrapper">
      <toolbar></toolbar>
    </div>
    <div class="bg">
      <button>test124344234234</button>
    </div>
    <div id="container"></div>
    <div id="preview"></div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { mapState, mapMutations } from 'vuex'
import Line from '@/elements/line'
import Brush from '@/elements/brush'
import Circle from '@/elements/circle'
import Semicircle from '@/elements/semicircle'
import Polygon from '@/elements/polygon'
import Triangle from '@/elements/triangle'
import Rect from '@/elements/rect'
import Custom from '@/elements/custom'
import toolbar from '@/components/toolbar'
import { TriangleSceneFunc, RectSceneFunc, PolygonSceneFunc, CustomLayer } from '@/elements/util'

export default {
  name: "App",
  data () {
    return {
      stage: {},
      layer: {},
      previewStage: null,
      mode: 'brush',
      isBrushMode: false,
      triangleMode: 'equilateral',
      rectMode: 'square',
      side: 5,
      config: {
        // x: 300,
        // y: 200,
        fill: '',
        stroke: 'red',
        strokeWidth: 1,
        dashEnabled: false
      }
    }
  },
  computed: {
    ...mapState([
      'stageHistory',
      'stageHistoryStep'
    ])
  },
  components: {
    toolbar
  },
  mounted () {
    this.stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 750
    })

    this.layer = new CustomLayer({ name: 'customLayer' })
    this.stage.add(this.layer)

    this.brushLayer = new Konva.Layer({ name: 'brushLayer' })
    this.stage.add(this.brushLayer)

    this.INITHISTORY(this.stage.toJSON())

    this.attachStageEvents()
  },
  methods: {
    ...mapMutations([
      'INITHISTORY',
      'PUSHHISTORY',
      'CLEARHOSTORY',
      'REDO',
      'UNDO'
    ]),
    attachStageEvents () {
      this.stage.on('click tap', e => {
        console.log(this.layer.children.length)
        let target = e.target
        if (target === this.stage) {
          console.log('-------target is stage---------')
          this.layer.selectedElement = null
          this.stage.find('Transformer').destroy()
          this.stage.find('.lineAnchor').destroy()
          this.layer.draw()
          this.preview()
          return
        } else if (target.hasName('straightLine') || target.hasName('lineAnchor')) {
          // e.evt.cancelBubble = true
          target = target.getParent()
          Line.addAnchors(target)
          this.layer.selectedElement = target
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
        this.layer.add(tr)
        tr.attachTo(target)
        this.layer.draw()
        console.log(tr.anchorStroke())
        this.layer.selectedElement = target
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

    handleHistory () {
      const stageJSON = this.stage.toJSON()
      const lastStageJSON = this.stageHistory[this.stageHistoryStep]
      console.log('stagejson====', stageJSON)
      console.log('laststagejson====', lastStageJSON)
      console.log(stageJSON !== lastStageJSON)
      if (stageJSON !== lastStageJSON) {
        this.PUSHHISTORY(stageJSON)
      }
    },
    redo () {
      this.REDO()
      this.reload()
    },
    undo () {
      this.UNDO()
      this.reload()
    },
    reload () {
      const lastStageJSON = this.stageHistory[this.stageHistoryStep]
      console.log('stage object ---- ', this.stage.toObject())
      console.log('lastStageJSON reload ----- ', lastStageJSON)
      const stageObj = JSON.parse(lastStageJSON)
      let customLayerData = stageObj.children[0]
      let brushLayerData = stageObj.children[1]

      this.layer.destroyChildren()
      customLayerData.children.forEach(child => {
        let node = Konva.Node.create(child)
        this.layer.add(node)
      })
      this.redrawWithSceneFunc(this.layer)
      this.layer.batchDraw()

      this.brushLayer.destroyChildren()
      brushLayerData.children.forEach(child => {
        let node = Konva.Node.create(child)
        this.layer.add(node)
      })
      this.layer.batchDraw()
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
      const element = this.layer.selectedElement
      if (element === null) {
        alert('please select one graph')
        return
      }
      element.remove()
      this.stage.find('Transformer').destroy()
      this.layer.draw()
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
      if (this.previewStage) this.previewStage.destroy()
      // console.log('json------', this.stage.toJSON())
      // console.log('object------', this.stage.toObject())
      let obj = this.stage.toObject()
      Object.assign(obj.attrs, {
        width: window.innerWidth / 4,
        height: window.innerHeight / 4,
        scaleX: 1 / 4,
        scaleY: 1 / 4,
        container: 'preview'
      })

      this.previewStage = Konva.Node.create(obj, 'preview')
      this.redrawWithSceneFunc(this.previewStage)
      this.previewStage.draw()
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
    addRect () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Rect({
        layer: this.layer,
        mode: this.rectMode,
        ...this.config
      })
    },
    addSemicircle () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Semicircle({ layer: this.layer, ...this.config })
    },
    addCenterSemicircle () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Semicircle({ layer: this.layer, mode: 'center', ...this.config })
    },
    addCircle () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Circle({ layer: this.layer, ...this.config })
    },
    addCircleWithCenter () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Circle({ layer: this.layer, mode: 'center', ...this.config })
    },
    addStraight () {
      this.detachDrawEvents()
      this.attachStageEvents()
      const { x, y, ...others } = this.config
      new Line({ layer: this.layer, ...others })
    },
    addPolygon () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Polygon({
        layer: this.layer,
        sides: Number(this.side),
        ...this.config
      })
    },
    addTriangle () {
      this.detachDrawEvents()
      this.attachStageEvents()
      new Triangle({ layer: this.layer, mode: this.triangleMode, ...this.config })
    },
    addCustom () {
      this.detachDrawEvents()
      this.attachStageEvents()
      let custom = new Custom({ layer: this.layer, ...this.config })
      custom.callback = () => {
        this.quitCustom()
      }
    },
    quitCustom () {
      this.detachDrawEvents()
      this.attachStageEvents()
    },
    handleModeChange () {
      this.isBrushMode = !this.isBrushMode
      if (this.isBrushMode) {
        this.layer.hitGraphEnabled(false)
        this.brushLayer.hitGraphEnabled(true)
      } else {
        this.layer.hitGraphEnabled(true)
        this.brushLayer.hitGraphEnabled(false)
        this.detachDrawEvents()
        this.attachStageEvents()
        return
      }
    },
    handleTriangleModeChange (e) {
      console.log(e)
      this.triangleMode = e.target.value
    },
    handleRectModeChange (e) {
      console.log(e)
      this.rectMode = e.target.value
    },
    handleFillChange (e) {
      this.config.fill = e.target.value
    },
    handleStrokeChange (e) {
      this.config.stroke = e.target.value
    },
    handleDashChange (e) {
      console.log()
      this.config.dashEnabled = !!Number(e.target.value)
    },
    handleStrokeWidthChange (e) {
      this.config.strokeWidth = Number(e.target.value)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/reset.scss';

#app {
  position: relative;
  width: 1000px;
  height: 750px;
}
#toolbar-wrapper {
  /* position: absolute;
  left: 0;
  top: 0; */
}
.bg {
  position: absolute;
  width: 100%;
  height: 500px;
  border: 1px solid black;
}
#container {
  width: 100%;
  border: 1px solid red;
}
#preview {
  position: absolute;
  top: 100px;
  left: 750px;
  width: 250px;
  height: 187.5px;
  border: 1px solid red;
}
</style>
