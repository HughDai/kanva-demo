<template>
  <div class="line-style-picker">
    <div class="kt-icon-line-solid line-checked"></div>
    <popper offset="0,11px">
      <ul slot="content" class="popper-content popper-line">
        <li v-for="i in ['dash', 'solid']" :key="i" :class="'kt-icon-line-'+ i"></li>
      </ul>
      <a class="kt-icon-arrow-18" slot="reference"></a>
    </popper>
  </div>
</template>

<script>
import popper from './popper'

export default {
  name: 'LineStyle',
  components: {
    popper
  }
}
</script>
