<template>
  <div class="stroke-width-picker">
    <div class="kt-icon-sw-medium line-checked"></div>
    <popper offset="0,11px">
      <ul slot="content" class="popper-content popper-sw">
        <li v-for="i in ['small', 'medium', 'large']" :key="i" :class="'kt-icon-sw-'+ i"></li>
      </ul>
      <a class="kt-icon-arrow-18" slot="reference"></a>
    </popper>
  </div>
</template>

<script>
import popper from './popper'

export default {
  name: 'StrokeWidth',
  components: {
    popper
  }
}
</script>
