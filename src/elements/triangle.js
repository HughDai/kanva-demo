/* eslint-disable */ 
import Konva from 'konva'
import { TriangleSceneFunc } from './util'
import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  sides: 3,
  width: 200,
  height: 200,
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Triangle {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = assign(DEFAULT_CONFIG, options)
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
    }
    this.instance = shape
    return this.instance
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