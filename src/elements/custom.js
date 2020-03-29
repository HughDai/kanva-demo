/* eslint-disable */ 
import Konva from 'konva'
import { PolygonSceneFunc } from './util'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH
}
export default class Custom {
  constructor (options = {}) {
    const { layer, x, y, ...others } = options
    this.options = Object.assign(DEFAULT_CONFIG, others)
    const { strokeWidth, fill } = this.options
    this.anchorWidth = strokeWidth || STROKE_WIDTH
    this.anchorFill = fill || STROKE_COLOR
    this.layer = layer
    this.stage = this.layer.getStage()
    this.lastLine = null
    this.lastAnchor = null
    this.isDrawing = false
    this.anchorPoints = []
    this.callback = function () {}
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      console.log(pos)
      this.anchorPoints.push({x: pos.x, y: pos.y})
      console.log(this.anchorPoints)
      this.lastAnchor = new Konva.Circle({
        name: 'customAnchor',
        x: pos.x,
        y: pos.y,
        fill: this.anchorFill,
        radius: this.anchorWidth * 4
      })
      this.lastLine = new Konva.Line({
        name: 'customLine',
        stroke: this.options.stroke,
        strokeWidth: this.options.strokeWidth,
        points: [pos.x, pos.y],
        dash: this.options.dash
      })

      this.layer.add(this.lastAnchor)
      this.layer.add(this.lastLine)
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing) {
        return
      }
      const pos = this.stage.getPointerPosition()
      const newPoints = [
        this.lastAnchor.x(),
        this.lastAnchor.y(),
        pos.x,
        pos.y
      ]
      this.lastLine.points(newPoints)
      console.log(newPoints)
      this.layer.batchDraw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
    })

    document.body.addEventListener('keyup', e => {
      console.log(e)
      console.log(this.anchorPoints)
      if (e.keyCode === 13 && this.anchorPoints.length > 1) {
        this.draw()
      }
    })
  }

  draw () {
    const xPoints = this.anchorPoints.map(p => p.x)
    const yPoints = this.anchorPoints.map(p => p.y)
    const x = Math.min(...xPoints)
    const y = Math.min(...yPoints)
    const width = Math.max(...xPoints) - x
    const height = Math.max(...yPoints) - y
    const shape = new Konva.Shape({
      name: 'custom',
      width, height, x, y,
      draggable: true,
      ...this.options
    })
    // wtf 一天
    this.anchorPoints.forEach(p => {
      p.x -= x
      p.y -= y
    })
    shape.attrs.points = this.anchorPoints
    shape.sceneFunc((context, shape) => {
      PolygonSceneFunc.custom(context, shape)
    })

    console.log(shape.toDataURL())
    
    this.layer.find('.customAnchor, .customLine').destroy()

    this.layer.add(shape)
    this.layer.draw()
    this.anchorPoints = []
    this.lastAnchor = null
    this.lastLine = null
    document.body.removeEventListener('keyup', () => {})
    this.callback()
  }
}