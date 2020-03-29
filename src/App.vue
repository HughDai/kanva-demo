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
    <select @change="handleModeChange">
      <option value="brush">画笔</option>
      <option value="eraser">橡皮</option>
    </select>
    <button @click="draw">{{isDrawing ? '退出画笔' : '画笔'}}</button>
    <button @click="preview">预览</button>
    <button @click="remove">删除</button>
    <button @click="clear">清屏</button>
    <button @click="undo">撤销</button>
    <button @click="redo">重做</button>
    <br>
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
    <div id="container"></div>
    <div id="preview"></div>
  </div>
</template>

<script>
/* eslint-disable */ 
import Line from '@/elements/line'
import Circle from '@/elements/circle'
import SemiCircle from '@/elements/semicircle'
import Polygon from '@/elements/polygon'
import Triangle from '@/elements/triangle'
import Rect from '@/elements/rect'
import Custom from '@/elements/custom'
import { TriangleSceneFunc, RectSceneFunc, PolygonSceneFunc, CustomLayer } from '@/elements/util'

export default {
  name: "App",
  data () {
    return {
      stage: {},
      layer: {},
      previewStage: null,
      mode: 'brush',
      triangleMode: 'equilateral',
      rectMode: 'square',
      side: 5,
      isPaint: false,
      lastLine: null,
      isDrawing: false,
      config: {
        x: 300,
        y: 200,
        fill: '',
        stroke: 'red',
        strokeWidth: 1,
        dashEnabled: false
      }
    }
  },
  mounted () {
    this.stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 750
    })

    this.layer = new CustomLayer()
    this.stage.add(this.layer)

    this.brushLayer = new Konva.Layer()
    this.stage.add(this.brushLayer)

    this.attachStageEvents()
  },
  methods: {
    attachStageEvents () {
      this.stage.on('click', e => {
        console.log(e.target)
        let target = e.target
        if (target === this.stage) {
          this.layer.selectedElement = null
          this.stage.find('Transformer').destroy()
          this.stage.find('.lineAnchor').destroy()
          this.layer.draw()
          this.preview()
          return
        } else if (target.hasName('straightLine') || target.hasName('lineAnchor')) {
          target = target.getParent()
          Line.addAnchors(target)
          this.layer.selectedElement = target
          return
        } else if (target.hasName('line')) {
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
        this.layer.add(tr)
        tr.attachTo(target)
        this.layer.draw()
        console.log(tr.anchorStroke())
        this.layer.selectedElement = target
      })

      this.stage.on('dragmove', e => {
        this.preview()
      })
    },
    detachDrawEvents () {
      this.stage.off('mousedown touchstart mouseup touchend mousemove touchmove')
    },
    draw () {
      this.isDrawing = !this.isDrawing
      if (this.isDrawing) {
        this.layer.hitGraphEnabled(false)
        this.brushLayer.hitGraphEnabled(true)
      } else {
        this.layer.hitGraphEnabled(true)
        this.brushLayer.hitGraphEnabled(false)
        this.detachDrawEvents()
        return
      }
      this.stage.on('mousedown touchstart', () => {
        this.isPaint = true
        const pos = this.stage.getPointerPosition()
        console.log(pos)
        this.lastLine = new Konva.Line({
          name: 'line',
          stroke: this.config.stroke,
          strokeWidth: this.config.strokeWidth,
          globalCompositeOperation: this.mode === 'brush' ? 'source-over' : 'destination-out',
          points: [pos.x, pos.y]
        })
        this.brushLayer.add(this.lastLine)
      })
      this.stage.on('mouseup touchend', () => {
        this.isPaint = false
      })
      this.stage.on('mousemove touchmove', () => {
        if (!this.isPaint) {
          return
        }
        const pos = this.stage.getPointerPosition()
        var newPoints = this.lastLine.points().concat([pos.x, pos.y])
        this.lastLine.points(newPoints)
        console.log(newPoints)
        this.brushLayer.batchDraw()
      })
    },
    remove () {
      const element = this.layer.selectedElement
      if (element === null) {
        alert('请先选中图形')
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
      // this.stage.clear()
      this.preview()
    },
    redo () {

    },
    undo () {

    },
    preview () {
      if (this.previewStage) this.previewStage.destroy()
      console.log('json------', this.stage.toJSON())
      console.log('object------', this.stage.toObject())
      let obj = this.stage.toObject()
      Object.assign(obj.attrs, {
        width: window.innerWidth / 4,
        height: window.innerHeight / 4,
        scaleX: 1 / 4,
        scaleY: 1 / 4,
        container: 'preview'
      })
      console.log(obj)

      this.previewStage = Konva.Node.create(obj, 'preview')
      let triangleShapes = this.previewStage.find('.right, .isosceles, .equilateral')
      let rectShapes = this.previewStage.find('.rhombus, .trapezoid')
      let customShapes = this.previewStage.find('.custom')

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
      this.previewStage.draw()

      // const url = this.stage.toDataURL()
      // document.getElementById('preview').src = url
    },
    addRect () {
      let rect = new Rect({
        mode: this.rectMode,
        ...this.config
      }).create()
      console.log(rect)
      this.layer.customAdd(rect)
      this.layer.draw()
    },
    addSemicircle () {
      let semicircle = new SemiCircle({
        ...this.config
      }).create()
      this.layer.customAdd(semicircle)
      this.layer.draw()
    },
    addCenterSemicircle () {
      let semicircle = new SemiCircle({
        ...this.config
      }).createWithCenter()
      this.layer.customAdd(semicircle)
      this.layer.draw()
    },
    addCircle () {
      let circle = new Circle({
        ...this.config
      }).create()
      this.layer.customAdd(circle)
      this.layer.draw()
    },
    addCircleWithCenter () {
      let group = new Circle({
        ...this.config
      }).createWithCenter()
      this.layer.customAdd(group)
      this.layer.batchDraw()
    },
    addStraight () {
      const { x, y, ...others } = this.config
      let lineGrpoup = new Line({ layer: this.layer, ...others })
      console.log(lineGrpoup)
      // this.layer.customAdd(lineGrpoup)
      // this.layer.batchDraw()
    },
    addPolygon () {
      console.log(Konva)
      const polygon = new Polygon({ sides: Number(this.side), ...this.config }).drawRegular()
      this.layer.customAdd(polygon)
      this.layer.draw()
      console.log('after add polygon =======', this.stage.toJSON())
    },
    addTriangle () {
      const triangle = new Triangle({ mode: this.triangleMode, ...this.config }).create()
      console.log(triangle)
      this.layer.customAdd(triangle)
      this.layer.draw()
    },
    addCustom () {
      let custom = new Custom({ layer: this.layer, ...this.config })
      custom.callback = () => {
        this.quitCustom()
      }
    },
    quitCustom () {
      this.detachDrawEvents()
    },
    handleModeChange (e) {
      console.log(e)
      this.mode = e.target.value
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
#container {
  width: 1000px;
  height: 750px;
  border: 1px solid red;
  margin-top: 10px;
}
#preview {
  position: absolute;
  top: 80px;
  left: 750px;
  width: 250px;
  height: 187.5px;
  border: 1px solid red;
}
</style>
