/* eslint-disable */ 
import Konva from 'konva'
import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  x: 200,
  y: 100,
  radius: 100,
  fill: '',
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Circle {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = assign({}, DEFAULT_CONFIG, options)
  }

  create (options) {
    this.instance = new Konva.Circle(this.options)
    return this.instance
  }

  createWithCenter () {
    const options = Object.assign({}, DEFAULT_CONFIG, { name: 'circleWithCenter', draggable: false })
    const circle = new Konva.Circle(options)
    const centerPoint = new Konva.Circle({
      name: 'circleCenter',
      x: circle.x(),
      y: circle.y(),
      radius: STROKE_WIDTH * 4,
      fill: STROKE_COLOR,
      draggable: false
    })
    const group = new Konva.Group({
      width: 100,
      draggable: true,
      hitStrokeWidth: 20
    })
    group.add(circle, centerPoint)
    return group
  }
}
