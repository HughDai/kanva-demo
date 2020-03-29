/* eslint-disable */ 
import Konva from 'konva'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]
const ANCHOR_WIDTH = STROKE_WIDTH * 10

const DEFAULT_CONFIG = {
  name: 'straightLine',
  points: [100, 100, 200, 200],
  stroke: STROKE_COLOR,
  strokeWidth: 1,
  tension: 1,
  dash: DASH,
  hitStrokeWidth: 20
}

export default class Line {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = Object.assign(DEFAULT_CONFIG, options)
    this.layer = options.layer
    this.stage = this.layer.getStage()
    this.group = null
    this.line = null
    this.tlAnchor = null
    this.brAnchor = null
    this.isDrawing = false
    this.init()
  }

  init () {
    this.group = this.createGroup()

    this.stage.on('mousedown touchstart', e => {
      this.isDrawing = true
      const pos = this.stage.getPointerPosition()
      this.originPosition = pos
      this.line = new Konva.Line({
        name: 'straightLine',
        points: [pos.x, pos.y],
        ...this.options
      })
      this.group.add(this.line)
      this.layer.add(this.group)
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing) return
      const pos = this.stage.getPointerPosition()
      const newPoints = [
        this.originPosition.x,
        this.originPosition.y,
        pos.x,
        pos.y
      ]
      console.log(newPoints)
      this.line.points(newPoints)
      this.layer.batchDraw()
    })

    this.stage.on('mouseup touchend', e => {
      this.isDrawing = false
      this.line = null
      this.group = this.createGroup()
    })
  }

  createGroup () {
    return new Konva.Group({
      name: 'lineGroup',
      width: 10,
      draggable: true,
      hitStrokeWidth: 20
    }) 
  }

  draw () {
    this.group = new Konva.Group({
      name: 'lineGroup',
      width: 10,
      draggable: true,
      hitStrokeWidth: 20
    })
    this.drawLine()
    this.drawAnchors()
    this.tlAnchor.on('dragmove', () => { this.updateLine() })
    this.brAnchor.on('dragmove', () => { this.updateLine() })
    this.group.add(this.line, this.tlAnchor, this.brAnchor)
    return this.group
  }

  drawLine () {
    const { x, y, ...others } = this.options
    this.line = new Konva.Line(others)
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
      anchor.on('dragmove', () => { this.updateLine(line, layer, anchors) })
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
