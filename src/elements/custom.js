/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'
import { PolygonSceneFunc } from './util'

export default class Custom extends Graph {
  constructor (options) {
    super(options)
    this.name = 'custom'
    this.lastLine = null
    this.lastAnchor = null
    this.anchorPoints = []
    this.callback = function () {}
    this.init()
  }

  extendEvents () {
    document.body.addEventListener('keyup', e => {
      console.log(e)
      console.log(this.anchorPoints)
      if (e.keyCode === 13 && this.anchorPoints.length > 1) {
        this.draw()
      }
    })
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.anchorPoints.push({x: pos.x, y: pos.y})
    this.lastAnchor = new Konva.Circle({
      name: 'customAnchor',
      x: pos.x,
      y: pos.y,
      fill: 'red',
      radius: 4
    })
    this.lastLine = new Konva.Line({
      name: 'customLine',
      stroke: this.config.stroke,
      strokeWidth: this.config.strokeWidth,
      points: [pos.x, pos.y],
      dash: this.config.dash
    })

    this.layer.add(this.lastAnchor)
    this.layer.add(this.lastLine)
  }

  onMove () {
    const pos = this.stage.getPointerPosition()
    const newPoints = [
      this.lastAnchor.x(),
      this.lastAnchor.y(),
      pos.x,
      pos.y
    ]
    this.lastLine.points(newPoints)
    console.log(newPoints)
    this.layer.batchDraw()
  }

  draw () {
    const xPoints = this.anchorPoints.map(p => p.x)
    const yPoints = this.anchorPoints.map(p => p.y)
    const x = Math.min(...xPoints)
    const y = Math.min(...yPoints)
    const width = Math.max(...xPoints) - x
    const height = Math.max(...yPoints) - y
    const shape = new Konva.Shape({
      name: 'custom',
      width, height, x, y,
      draggable: true,
      ...this.config
    })
    // wtf 一天
    this.anchorPoints.forEach(p => {
      p.x -= x
      p.y -= y
    })
    shape.attrs.points = this.anchorPoints
    shape.sceneFunc((context, shape) => {
      PolygonSceneFunc.custom(context, shape)
    })
    
    this.layer.find('.customAnchor, .customLine').destroy()

    this.layer.add(shape)
    this.layer.draw()
    this.anchorPoints = []
    this.lastAnchor = null
    this.lastLine = null
    document.body.removeEventListener('keyup', () => {})
    this.callback()
  }
}