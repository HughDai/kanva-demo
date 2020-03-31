/* eslint-disable */ 
import Konva from 'konva'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Circle {
  constructor (options) {
    options = options || {}
    const { layer, center, ...others } = options
    this.layer = layer
    this.stage = layer.getStage()
    this.center = !!center
    this.circle = null
    this.group = null
    this.circleCenter = null
    this.isDrawing = false
    this.options = Object.assign(DEFAULT_CONFIG, others)
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      if (e.target !== this.stage) return
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      this.circle = new Konva.Circle({
        x: pos.x,
        y: pos.y,
        ...this.options
      })
      if (this.center) {
        this.group = new Konva.Group({
          draggable: true,
          hitStrokeWidth: 20
        })
        this.circleCenter = new Konva.Circle({
          name: 'circleCenter',
          x: pos.x,
          y: pos.y,
          radius: STROKE_WIDTH * 4,
          fill: 'black',
          draggable: false
        })
        this.circle.name('circleWithCenter')
        this.circle.draggable(false)
        this.group.add(this.circle, this.circleCenter)
        console.log(this.group.getLayer())
      } 
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing || e.target !== this.stage) return
      if (this.center) {
        if (!this.group.getLayer()) this.layer.add(this.group)
      } else {
        if (!this.circle.getLayer()) this.layer.add(this.circle)
      }
      const pos = this.stage.getPointerPosition()
      this.circle.radius(pos.y - this.circle.y())
      this.layer.draw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
    })
  }
}
