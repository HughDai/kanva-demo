/* eslint-disable */ 
import Konva from 'konva'
import { assign } from '@/utils'
import { RectSceneFunc } from './util'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  x: 120,
  y: 120,
  width: 200,
  height: 200,
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Rect {
  constructor (options) {
    options = options || {}
    this.mode = options.mode || 'square'
    this.instance = null
    this.options = assign(DEFAULT_CONFIG, options)
  }

  create () {
    let rect = null
    console.log(this.options)
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
        this.options.height = DEFAULT_CONFIG.height
        rect = new Konva.Rect(this.options)
        break
    }
    return rect
  }

  createRectangle () {
    this.options.name = 'rectange'
    const { height, ...others } = this.options
    let newH = others.width / 2
    return new Konva.Rect({ height: newH, ...others })
  }

  createRhombus () {
    this.options.name = 'rhombus'
    const rhombus = new Konva.Shape(this.options)
    
    rhombus.sceneFunc((context, shape) => {
      RectSceneFunc.rhombus(context, shape)
    })
    return rhombus
  }

  createTrapezoid () {
    this.options.name = 'trapezoid'
    const trapezoid = new Konva.Shape(this.options)
    
    trapezoid.sceneFunc((context, shape) => {
      RectSceneFunc.trapezoid(context, shape)
    })
    return trapezoid
  }
}