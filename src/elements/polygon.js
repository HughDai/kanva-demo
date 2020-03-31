/* eslint-disable */ 
import Konva from 'konva'
import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  sides: 5,
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Polygon {
  constructor (options) {
    options = options || {}
    const { layer, ...others } = options
    this.layer = layer
    this.stage = layer.getStage()
    this.polygon = null
    this.isDrawing = false
    this.options = assign(DEFAULT_CONFIG, others)
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      if (e.target !== this.stage) return
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      this.polygon = new Konva.RegularPolygon({
        name: 'regularPolygon',
        x: pos.x,
        y: pos.y,
        ...this.options
      })
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing || e.target !== this.stage) return
      if (!this.polygon.getLayer()) this.layer.add(this.polygon)
      const pos = this.stage.getPointerPosition()
      this.polygon.radius(pos.y - this.polygon.y())
      this.layer.draw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
    })
  }
}
