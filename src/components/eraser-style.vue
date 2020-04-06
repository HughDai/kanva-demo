<template>
  <ul class="eraser-width-picker">
    <li v-for="i in options" :key="i"
    :class="['kt-icon-eraser-'+ i, {'kt-hl': value === i}]"
    @click="onClick(i)"></li>
  </ul>
</template>

<script>
export default {
  name: 'EraserStyle',
  props: {
    value: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      options: ['small', 'medium', 'large']
    }
  },
  methods: {
    onClick (item) {
      this.$emit('change', item)
      // this.$store.CHANGE_SETTINGS({ key: 'eraserWidth', value: val })
    }
  }
}
</script>
