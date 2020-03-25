/* eslint-disable */ 
import Konva from 'konva'
// import { assign } from '@/utils'

const STROKE_COLOR = 'red'
const STROKE_WIDTH = 1
const DASH = [10, 5]
const ANCHOR_WIDTH = STROKE_WIDTH * 4

const DEFAULT_CONFIG = {
  name: 'straightLine',
  points: [100, 100, 200, 200],
  stroke: STROKE_COLOR,
  strokeWidth: 1,
  tension: 1,
  // dash: [10, 5],
  hitStrokeWidth: 20
}

export default class Line {
  constructor (options) {
    options = options || {}
    this.instance = null
    this.options = Object.assign(DEFAULT_CONFIG, options)
    this.stage = options.stage
    this.layer = options.layer
    this.group = null
    this.line = null
    this.tlAnchor = null
    this.brAnchor = null
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
    this.line = new Konva.Line(this.options)
  }

  drawAnchors (line) {
    line = line || this.line
    this.tlAnchor = new Konva.Circle({
      name: 'lineAnchor',
      x: line.points()[0],
      y: line.points()[1],
      // fill: STROKE_COLOR,
      radius: ANCHOR_WIDTH,
      stroke: STROKE_COLOR,
      strokeWidth: STROKE_WIDTH,
      draggable: true
    })

    this.brAnchor = new Konva.Circle({
      name: 'lineAnchor',
      x: line.points()[2],
      y: line.points()[3],
      // fill: STROKE_COLOR,
      radius: ANCHOR_WIDTH,
      stroke: STROKE_COLOR,
      strokeWidth: STROKE_WIDTH,
      draggable: true
    })
  }

  updateLine (line, layer) {
    console.log(this)
    line = line || this.line
    layer = layer || this.layer
    const points = [
      this.tlAnchor.x(),
      this.tlAnchor.y(),
      this.brAnchor.x(),
      this.brAnchor.y(),
    ]
    console.log(points)
    line.points(points)
    layer.batchDraw()
  }

  static addAnchors (group) {
    let anchors = group.find('Circle')
    if (anchors.length > 0) return
    let layer = group.getLayer()
    let line = group.findOne('Line')
    const instance = new this()
    instance.drawAnchors(line)
    instance.tlAnchor.on('dragmove', () => { instance.updateLine(line, layer) })
    instance.brAnchor.on('dragmove', () => { instance.updateLine(line, layer) })
    group.add(instance.tlAnchor, instance.brAnchor)
    layer.draw()
  }

  static removeAnchors (group) {
    let anchors = group.find('Circle')
    if (anchors.length === 0) return
    anchors.forEach(e => {
      e.destroy()
    })
    group.getLayer().draw()
  }
}
// group.on('click mouseenter mouseover', () => {
//   stage.container().style.cursor = 'move'
//   console.log('line mouseover')
//   setAnchorsVisible(true)
// })

// group.on('mouseleave', () => {
//   stage.container().style.cursor = 'default'
//   console.log('line mouseleave')
//   setAnchorsVisible(false)
// })
