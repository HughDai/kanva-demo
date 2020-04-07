// const DEFAULT_CONFIG = {
//   fill: 'red',
//   stroke: 'red',
//   strokeWidth: 1,
//   dashEnabled: false,
//   dash: [10, 5],
//   draggable: true
// }

export default class Graph {
  constructor (options) {
    options = options || {}
    const { layer, mode, ...others } = options
    this.layer = layer
    this.stage = layer.getStage()
    this.instance = null
    this.mode = mode
    this.isDrawing = null
    this.config = others
    this.config.draggable = true
    if (this.config.dashEnabled) this.config.dash = [10, 5]
  }

  init () {
    this.stage.on('mousedown touchstart', e => {
      if (e.target !== this.stage) return
      this.isDrawing = true
      this.onStart()
    })

    this.stage.on('mousemove touchmove', e => {
      if (!this.isDrawing || e.target !== this.stage) return
      this.onMove()
    })

    this.stage.on('mouseup touchend', () => {
      this.isDrawing = false
      this.onEnd()
    })

    this.extendEvents()
  }

  getInstance () {
    return this.instance
  }

  onStart () {}

  onMove () {}

  onEnd () {}

  extendEvents () {}

  // 修改 fill stroke strokeWidth dashEnabled
  static setConfig (key, val) {
    this.config[key] = val
  }
}
