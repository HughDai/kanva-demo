/* eslint-disable */ 
import Konva from 'konva'
import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  x: 200,
  y: 200,
  width: 200,
  height: 100,
  innerRadius: 0,
  outerRadius: 100,
  angle: 180,
  rotation: 180,
  dash: DASH,
  fill: '',
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Semicircle {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = assign({}, DEFAULT_CONFIG, options)
  }

  create (options) {
    const { radius } = this.options
    // this.options.width = radius * 2
    // this.options.height = radius * 2
    const arc = new Konva.Arc(this.options)
    // circle.sceneFunc((context, shape) => {

    // })
    return arc
  }

  createWithCenter () {
    const options = Object.assign({}, DEFAULT_CONFIG, { name: 'circleWithCenter', draggable: false })
    const arc = new Konva.Arc(options)
    const centerPoint = new Konva.Circle({
      name: 'circleCenter',
      x: arc.x(),
      y: arc.y(),
      radius: STROKE_WIDTH * 4,
      fill: STROKE_COLOR,
      draggable: false
    })
    const group = new Konva.Group({
      width: 100,
      draggable: true,
      hitStrokeWidth: 20
    })
    group.add(arc, centerPoint)
    return group
  }
}