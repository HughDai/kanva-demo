<template>
  <ul class="board-style-picker">
    <li v-for="board in boards" :key="board" :class="'kt-icon-board-'+ board"></li>
  </ul>
</template>

<script>
export default {
  name: 'BoardStyle',
  data () {
    return {
      boards: ['white', 'black', 'english']
    }
  }
}
</script>