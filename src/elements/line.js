/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'

const ANCHOR_WIDTH = 10

export default class Line extends Graph {
  constructor (options) {
    super(options)
    Object.assign(this.config, {
      name: 'straightLine',
      hitStrokeWidth: 20,
      tension: 1
    })
    this.group = null
  }

  onStart () {
    this.group = this.createGroup()
    const pos = this.stage.getPointerPosition()
    this.originPosition = pos
    this.instance = new Konva.Line({
      points: [pos.x, pos.y],
      ...this.config
    })
    this.group.add(this.instance)
  }

  onMove () {
    if (!this.group.getLayer()) this.layer.add(this.group)
    const pos = this.stage.getPointerPosition()
    const newPoints = [
      this.originPosition.x,
      this.originPosition.y,
      pos.x,
      pos.y
    ]
    console.log(newPoints)
    this.instance.points(newPoints)
    this.layer.batchDraw()
  }

  onEnd () {
    this.instance = null
    this.group = this.createGroup()
  }

  createGroup () {
    return new Konva.Group({
      name: 'lineGroup',
      width: 10,
      draggable: true,
      hitStrokeWidth: 20
    }) 
  }

  static createAnchors (line) {
    const tlAnchor = new Konva.Rect({
      name: 'lineAnchor',
      x: line.points()[0] - ANCHOR_WIDTH,
      y: line.points()[1] - ANCHOR_WIDTH,
      width: ANCHOR_WIDTH,
      height: ANCHOR_WIDTH,
      stroke: '#00a1ff',
      strokeWidth: 1,
      draggable: true
    })

    const brAnchor = new Konva.Rect({
      name: 'lineAnchor',
      x: line.points()[2],
      y: line.points()[3],
      width: ANCHOR_WIDTH,
      height: ANCHOR_WIDTH,
      stroke: '#00a1ff',
      strokeWidth: 1,
      draggable: true
    })
    return [tlAnchor, brAnchor]
  }

  static updateLine (line, layer, anchors) {
    const points = [
      anchors[0].x() + ANCHOR_WIDTH,
      anchors[0].y() + ANCHOR_WIDTH,
      anchors[1].x(),
      anchors[1].y(),
    ]
    line.points(points)
    layer.batchDraw()
  }

  static addAnchors (group) {
    let anchors = group.find('Rect')
    if (anchors.length > 0) return
    let layer = group.getLayer()
    let line = group.findOne('Line')
    anchors = this.createAnchors(line)
    anchors.forEach(anchor => {
      anchor.on('dragmove', e => {
        e.evt.cancelBubble = true
        this.updateLine(line, layer, anchors)
      })
    })
    group.add(...anchors)
    layer.draw()
  }

  static removeAnchors (group) {
    let anchors = group.find('Rect')
    if (anchors.length === 0) return
    anchors.forEach(e => {
      e.destroy()
    })
    group.getLayer().draw()
  }
}
