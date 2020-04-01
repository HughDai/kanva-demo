/* eslint-disable */ 
import Konva from 'konva'
import Graph from './graph'
import { RectSceneFunc } from './util'

export default class Rect extends Graph {
  constructor (options) {
    super(options)
    this.name = 'rect'
    this.mode = this.mode || 'square'
    this.init()
  }

  onStart () {
    const pos = this.stage.getPointerPosition()
    this.instance = this.create()
    this.instance.position(pos)
  }

  onMove () {
    if (!this.instance.getLayer()) this.layer.add(this.instance)
    const pos = this.stage.getPointerPosition()
    const { x, y } = this.instance.position()
    let size = { width: pos.x - x, height: pos.y - y }
    if (this.mode === 'square') {
      size.width = size.height
    }
    this.instance.size(size)
    this.layer.draw()
  }

  create () {
    let rect = null
    switch (this.mode) {
      case 'rectangle':
        rect = this.createRectangle()
        break
      case 'rhombus':
        rect = this.createRhombus()
        break
      case 'trapezoid':
        rect = this.createTrapezoid()
        break
      default:
        this.config.name = 'square'
        rect = new Konva.Rect(this.config)
        break
    }
    return rect
  }

  createRectangle () {
    this.config.name = 'rectange'
    return new Konva.Rect(this.config)
  }

  createRhombus () {
    this.config.name = 'rhombus'
    const rhombus = new Konva.Rect(this.config)
    
    rhombus.sceneFunc((context, shape) => {
      RectSceneFunc.rhombus(context, shape)
    })
    return rhombus
  }

  createTrapezoid () {
    this.config.name = 'trapezoid'
    const trapezoid = new Konva.Rect(this.config)
    
    trapezoid.sceneFunc((context, shape) => {
      RectSceneFunc.trapezoid(context, shape)
    })
    return trapezoid
  }
}
