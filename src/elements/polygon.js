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

  test () {
    let customShape = new Konva.Shape({
      x: 5,
      y: 10,
      fill: 'red',
      // a Konva.Canvas renderer is passed into the sceneFunc function
      sceneFunc (context, shape) {
        context.beginPath()
        context.moveTo(200, 50)
        context.lineTo(420, 80)
        context.quadraticCurveTo(200, 200, 200, 200)
        context.closePath()
        // Konva specific method
        context.fillStrokeShape(shape)
      }
    })
    this.instance = customShape
    return this.instance
  }

  drawRegular () {
    console.log(this.options)
    const polygon = new Konva.RegularPolygon(this.options)
    this.instance = polygon
    return this.instance
  }

  drawIsoscelesTrapezoid () {

  }

  drawCustom () {

  }
}
