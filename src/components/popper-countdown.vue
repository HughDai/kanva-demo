<template>
  <popper offset="0,6px">
    <ul slot="content" class="popper-content popper-countdown">
      <li v-for="(n, i) in numbers" :key="i">{{n}}s</li>
    </ul>
    <li slot="reference" class="kt-selector kt-icon-countdown"></li>
  </popper>
</template>

<script>
import popper from './popper'

export default {
  name: 'PopperCountdown',
  components: {
    popper
  },
  data () {
    return {
      numbers: [15, 30, 60]
    }
  }
}
</script>
