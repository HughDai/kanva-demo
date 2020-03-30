/* eslint-disable */ 
import Konva from 'konva'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]
const ANCHOR_WIDTH = STROKE_WIDTH * 10

const DEFAULT_CONFIG = {
  name: 'straightLine',
  stroke: STROKE_COLOR,
  strokeWidth: 1,
  tension: 1,
  dash: DASH,
  hitStrokeWidth: 20
}

export default class Line {
  constructor (options) {
    options = options || {}
    this.instance = null
    const { mode, layer, x, y, ...others } = options
    this.mode = mode || 'brush'
    this.options = Object.assign(DEFAULT_CONFIG, others)
    this.layer = layer
    this.stage = layer.getStage()
    this.line = null
    this.isDrawing = false
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', () => {
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      console.log(pos)
      this.line = new Konva.Line({
        name: 'line',
        ...this.options,
        globalCompositeOperation: this.mode === 'brush' ? 'source-over' : 'destination-out',
        points: [pos.x, pos.y]
      })
      this.layer.add(this.line)
    })

    this.stage.on('mousemove touchmove', () => {
      if (!this.isDrawing) {
        return
      }
      const pos = this.stage.getPointerPosition()
      var newPoints = this.line.points().concat([pos.x, pos.y])
      this.line.points(newPoints)
      console.log(newPoints)
      this.layer.batchDraw()
    })

    this.stage.on('mouseup touchend', () => {
      this.isDrawing = false
    })
  }
}