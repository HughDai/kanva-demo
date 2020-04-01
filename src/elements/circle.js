/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'

export default class Circle extends Graph {
  constructor (options) {
    super(options)
    this.group = null
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.instance = new Konva.Circle({
      x: pos.x,
      y: pos.y,
      ...this.config
    })
    if (this.mode === 'center') {
      this.group = new Konva.Group({
        draggable: true,
        hitStrokeWidth: 20
      })
      this.circleCenter = new Konva.Circle({
        name: 'circleCenter',
        x: pos.x,
        y: pos.y,
        radius: this.config.strokeWidth * 4,
        fill: 'black',
        draggable: false
      })
      this.instance.name('circleWithCenter')
      this.instance.draggable(false)
      this.group.add(this.instance, this.circleCenter)
      console.log(this.group.getLayer())
    } 
  }

  onMove () {
    if (this.mode === 'center') {
      if (!this.group.getLayer()) this.layer.add(this.group)
    } else {
      if (!this.instance.getLayer()) this.layer.add(this.instance)
    }
    const pos = this.stage.getPointerPosition()
    this.instance.radius(pos.y - this.instance.y())
    this.layer.draw()
  }
}
