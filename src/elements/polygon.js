/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'

export default class Polygon extends Graph {
  constructor (options) {
    super(options)
    this.sides = options.sides || 5
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.instance = new Konva.RegularPolygon({
      name: 'regularPolygon',
      x: pos.x,
      y: pos.y,
      ...this.config
    })
  }

  onMove () {
    if (!this.instance.getLayer()) this.layer.add(this.instance)
    const pos = this.stage.getPointerPosition()
    this.instance.radius(pos.y - this.instance.y())
    this.layer.draw()
  }
}
