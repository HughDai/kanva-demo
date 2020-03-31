/* eslint-disable */ 
import Konva from 'konva'
import { RectSceneFunc } from './util'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Rect {
  constructor (options) {
    options = options || {}
    const { layer, ...others } = options
    this.layer = layer
    this.stage = layer.getStage()
    this.mode = options.mode || 'square'
    this.rect = null
    this.isDrawing = false
    this.options = Object.assign(DEFAULT_CONFIG, others)
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      if (e.target !== this.stage) return
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      this.rect = this.create()
      this.rect.position(pos)
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing || e.target !== this.stage) return
      if (!this.rect.getLayer()) this.layer.add(this.rect)
      const pos = this.stage.getPointerPosition()
      const { x, y } = this.rect.position()
      let size = { width: pos.x - x, height: pos.y - y }
      if (this.mode === 'square') {
        size.width = size.height
      }
      this.rect.size(size)
      this.layer.draw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
    })
  }

  create () {
    let rect = null
    const mode = this.options.mode
    switch (mode) {
      case 'rectangle':
        rect = this.createRectangle()
        break
      case 'rhombus':
        rect = this.createRhombus()
        break
      case 'trapezoid':
        rect = this.createTrapezoid()
        break
      default:
        this.options.name = 'square'
        rect = new Konva.Rect(this.options)
        break
    }
    return rect
  }

  createRectangle () {
    this.options.name = 'rectange'
    return new Konva.Rect(this.options)
  }

  createRhombus () {
    this.options.name = 'rhombus'
    const rhombus = new Konva.Rect(this.options)
    
    rhombus.sceneFunc((context, shape) => {
      RectSceneFunc.rhombus(context, shape)
    })
    return rhombus
  }

  createTrapezoid () {
    this.options.name = 'trapezoid'
    const trapezoid = new Konva.Rect(this.options)
    
    trapezoid.sceneFunc((context, shape) => {
      RectSceneFunc.trapezoid(context, shape)
    })
    return trapezoid
  }
}