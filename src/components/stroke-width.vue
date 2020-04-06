<template>
  <div class="stroke-width-picker">
    <div :class="['kt-icon-sw-' + value, 'line-checked']"></div>
    <popper offset="0,11px">
      <ul slot="content" class="popper-content popper-sw">
        <li v-for="i in options" :key="i"
        :class="['kt-icon-sw-'+ i, { 'kt-hl': value === i}]"
        @click="onClick(i)"></li>
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
  },
  data () {
    return {
      value: 'medium',
      options: ['small', 'medium', 'large']
    }
  },
  methods: {
    onClick (val) {
      this.value = val
      this.$emit('change', val)
      // todo change settings
      // this.$store.CHANGE_SETTINGS({ key: 'strokeWidth', value: val })
    }
  }
}
</script>
