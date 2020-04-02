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

<style>
.popper {
  background-color: #4C4B4E;
  padding: 0;
  box-shadow: none;
  border: none;
}
.popper[x-placement^="top"] .popper__arrow {
  border-color: #4C4B4E transparent transparent transparent;
}
.popper[x-placement^="right"] .popper__arrow {
  border-color: transparent #4C4B4E transparent transparent;
}
.popper[x-placement^="bottom"] .popper__arrow {
  border-color: transparent transparent #4C4B4E transparent;
}
.popper[x-placement^="left"] .popper__arrow {
  border-color: transparent transparent transparent #4C4B4E;
}
</style>
