/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'

export default class Line extends Graph {
  constructor (options) {
    super(options)
    this.name = 'brush'
    Object.assign(this.config, {
      // tension: 1,
      // 平滑无毛刺
      bezier: true,
      lineCap: 'round',
      lineJoin: 'round',
      draggable: false
    })
    this.init()
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.instance = new Konva.Line({
      name: 'line',
      ...this.config,
      points: [pos.x, pos.y],
      globalCompositeOperation: this.mode === 'brush'
        ? 'source-over'
        : 'destination-out'
    })
  }

  onMove () {
    if (!this.instance.getLayer()) this.layer.add(this.instance)
    const pos = this.stage.getPointerPosition()
    var newPoints = this.instance.points().concat([pos.x, pos.y])

    this.instance.points(newPoints)
    this.layer.batchDraw()
  }
}