/* eslint-disable */ 
import Konva from 'konva'

export const TriangleSceneFunc = {
  right (context, shape) {
    const height = shape.height()
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(0, height)
    context.lineTo(height, height)
    context.closePath()
    context.fillStrokeShape(shape)
  },

  equilateral (context, shape) {
    const height = shape.height()
    const y = Math.tan(60 * Math.PI / 180) * height / 2
    console.log(y)
    context.beginPath()
    context.moveTo(height / 2, height - y)
    context.lineTo(0, height)
    context.lineTo(height, height)
    context.closePath()
    context.fillStrokeShape(shape)
  },

  isosceles (context, shape) {
    const height = shape.height()
    context.beginPath()
    context.moveTo(height / 2, 0)
    context.lineTo(0, height)
    context.lineTo(height, height)
    context.closePath()
    context.fillStrokeShape(shape)
  }
}

export const RectSceneFunc = {
  rhombus (context, shape) {
    const height = shape.height()
    const x = Math.tan(30 * Math.PI / 180) * height
    console.log('----------', height, x)
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(0, height)
    context.lineTo(height + x, height)
    context.lineTo(x * 2 + height, 0)
    context.closePath()
    context.fillStrokeShape(shape)
    shape.width(height + x * 2)
  },
  trapezoid (context, shape) {
    const height = shape.height()
    const x = Math.tan(30 * Math.PI / 180) * height
    shape.width(height + x * 2)
    console.log('----------', height, x)
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(0, height)
    context.lineTo(height + x * 2, height)
    context.lineTo(height + x, 0)
    context.closePath()
    context.fillStrokeShape(shape)
  }
}

export const PolygonSceneFunc = {
  custom (context, shape) {
    const points = shape.attrs.points
    // const { x, y } = shape.position()
    context.beginPath()
    context.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y)
    }
    context.closePath()
    context.fillStrokeShape(shape)
    console.log('position========', shape.position())
  }
}

export class CustomLayer extends Konva.Layer {
  constructor (options) {
    super(options)
    this.selectedElement = null
  }

  customAdd (...children) {
    this.add(...children)
    this.find('Transformer').destroy()
    let tr = new Konva.Transformer({
      rotateAnchorOffset: 20,
      borderDash: [3, 2]
      // enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    })
    let child = children[0]
    if (!child.hasName('lineGroup')) {
      this.add(tr)
      tr.attachTo(child)
      this.selectedElement = child
    }
    this.draw()
    this.getStage().fire('dragmove')
  }
}
