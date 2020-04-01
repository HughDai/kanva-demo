/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'
import { TriangleSceneFunc } from './util'

export default class Triangle extends Graph {
  constructor (options) {
    super(options)
    this.name = 'triangle'
    this.init()
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.instance = this.create()
    this.instance.position(pos)
  }

  onMove () {
    if (!this.instance.getLayer()) this.layer.add(this.instance)
    let size = this.calcSize()
    this.instance.size(size)
    this.layer.draw()
  }

  calcSize () {
    this.mode = this.mode || 'equilateral'
    const pos = this.stage.getPointerPosition()
    const { x, y } = this.instance.position()
    const height = pos.y - y
    let width = height
    if (this.mode === 'equilateral') {
      width = width = Math.tan(30 * Math.PI / 180) * height * 2
    }
    return { width, height }
  }

  create () {
    this.mode = this.mode || 'equilateral'
    let shape = null
    switch (this.mode) {
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
    this.config.name = 'right'
    const shape = new Konva.Shape(this.config)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.right(context, shape)
    })
    console.log(shape.toJSON())
    return shape
  }

  drawEquilateral () {
    this.config.name = 'equilateral'
    const shape = new Konva.Shape(this.config)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.equilateral(context, shape)
    })
    return shape
  }

  drawIsosceles () {
    this.config.name = 'isosceles'
    const shape = new Konva.Shape(this.config)
    shape.sceneFunc((context, shape) => {
      TriangleSceneFunc.isosceles(context, shape)
    })
    return shape
  }
}
