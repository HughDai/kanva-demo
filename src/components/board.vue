<template>
  <div class="board-container">
    <div class="board-main kt-board-white">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    type: String
  }
}
</script>

<style lang="scss">
.board-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
.board-main {
  position: relative;
}
.icon-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  height: 24px;
  background: url("~@/assets/images/icon-close.png") center no-repeat;
  background-size: 100% auto;
  cursor: pointer;
}
</style>
