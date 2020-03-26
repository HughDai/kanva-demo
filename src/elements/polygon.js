/* eslint-disable */ 
import Konva from 'konva'
import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]

const DEFAULT_CONFIG = {
  x: 100,
  y: 150,
  sides: 5,
  radius: 100,
  dash: DASH,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  draggable: true
}

export default class Polygon {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = assign(DEFAULT_CONFIG, options)
  }

  drawRegular () {
    console.log(this.options)
    const polygon = new Konva.RegularPolygon(this.options)
    this.instance = polygon
    return this.instance
  }
  
  drawCustom () {

  }
}
