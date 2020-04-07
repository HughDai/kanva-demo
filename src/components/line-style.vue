<template>
  <div class="line-style-picker">
    <div :class="['kt-icon-line-' + value, 'line-checked']"></div>
    <popper offset="0,11px">
      <ul slot="content" class="popper-content popper-line">
        <li v-for="i in options" :key="i"
        :class="['kt-icon-line-'+ i, {'kt-hl': value === i}]"
        @click="onClick(i)"></li>
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
  },
  data () {
    return {
      value: 'solid',
      options: ['dash', 'solid']
    }
  },
  methods: {
    onClick (val) {
      this.value = val
      this.$store.commit('CHANGE_STATE', { lineStyle: val })
    }
  }
}
</script>
