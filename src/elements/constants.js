import Line from '@/elements/line'
import Brush from '@/elements/brush'
import Circle from '@/elements/circle'
import Semicircle from '@/elements/semicircle'
import Triangle from '@/elements/triangle'
import Rect from '@/elements/rect'
import Custom from '@/elements/custom'

export const STROKE_WIDTH_ENUMS = {
  'small': 1,
  'medium': 2,
  'large': 3
}

export const ERASER_WIDTH_ENUMS = {
  'small': 6,
  'medium': 10,
  'large': 14
}

export const COLOR_ENUMS = {
  'blank': '',
  'black': 'black',
  'red': 'red',
  'blue': 'blue',
  'yellow': 'yellow',
  'white': 'white',
  'lightblue': '#01F8FF'
}

export const GRAPH_CLASSES = {
  Line, Brush, Circle, Semicircle, Triangle, Rect, Custom
}
