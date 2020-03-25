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

export class CustomLayer extends Konva.Layer {
  constructor () {
    super()
  }

  customAdd (...children) {
    this.add(...children)
    let tr = new Konva.Transformer({
      // borderStrokeWidth: 1,
      // anchorStrokeWidth: 1,
      rotateAnchorOffset: 20,
      borderDash: [3, 2]
      // enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    })
    let child = children[0]
    if (!child.hasName('lineGroup')) {
      this.add(tr)
      tr.attachTo(child)
    }
    this.draw()
    this.getParent().fire('dragmove')
  }
}
