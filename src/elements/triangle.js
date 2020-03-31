/* eslint-disable */ 
import Konva from 'konva'
import { TriangleSceneFunc } from './util'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Triangle {
  constructor (options) {
    options = options || {}
    const { layer, ...others } = options
    this.layer = layer
    this.stage = layer.getStage()
    this.triangle = null
    this.isDrawing = false
    this.options = Object.assign(DEFAULT_CONFIG, options)
    this.init()
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      if (e.target !== this.stage) return
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      this.triangle = this.create()
      this.triangle.position(pos)
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing || e.target !== this.stage) return
      if (!this.triangle.getLayer()) this.layer.add(this.triangle)
      let size = this.calcSize()
      this.triangle.size(size)
      this.layer.draw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
    })
  }

  calcSize () {
    const mode = this.options.mode || 'equilateral'
    const pos = this.stage.getPointerPosition()
    const { x, y } = this.triangle.position()
    const height = pos.y - y
    let width = height
    if (mode === 'equilateral') {
      width = width = Math.tan(30 * Math.PI / 180) * height * 2
    }
    return { width, height }
  }

  create () {
    const mode = this.options.mode || 'equilateral'
    console.log(mode)
    let shape = null
    switch (mode) {
      case 'right':
        shape = this.drawRight()
        break
      case 'isosceles':
        shape = this.drawIsosceles()
        break
      default:
        shape = this.drawEquilateral()
        break
    }
    return shape
  }

  drawRight () {
    this.options.name = 'right'
    const shape = new Konva.Shape(this.options)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.right(context, shape)
    })
    console.log(shape.toJSON())
    return shape
  }

  drawEquilateral () {
    this.options.name = 'equilateral'
    const shape = new Konva.Shape(this.options)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.equilateral(context, shape)
    })
    return shape
  }

  drawIsosceles () {
    this.options.name = 'isosceles'
    const shape = new Konva.Shape(this.options)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.isosceles(context, shape)
    })
    return shape
  }
}