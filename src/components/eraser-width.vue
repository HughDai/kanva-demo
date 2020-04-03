<template>
  <ul class="eraser-width-picker">
    <li v-for="i in ['small', 'medium', 'large']" :key="i" :class="'kt-icon-eraser-'+ i"></li>
  </ul>
</template>

<script>
export default {
  name: 'EraserWidth'
}
</script>
