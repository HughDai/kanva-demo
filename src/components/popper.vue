<template>
  <popper
  :trigger="trigger"
  :delayOnMouseOut=30
  :options="{
    placement: placement,
    modifiers: { offset: { offset: offset } }
  }">
    <div class="popper">
      <slot name="content"></slot>
    </div>
    <template slot="reference">
      <slot name="reference"></slot>
    </template>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  name: 'Popper',
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    placement: {
      type: String,
      default: 'top'
    },
    offset: {
      type: String,
      default: '0,0'
    }
  },
  components: {
    'popper': Popper
  }
}
</script>
