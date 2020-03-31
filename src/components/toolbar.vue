<template>
  <div class="konva-toolbar-container">
    <aside class="left-side">

    </aside>
    <aside class="right-side">
      <button>adfasd</button>
      <button>adfasd</button>
      <button>adfasd</button>
      <button>adfasd</button>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<style lang="scss" scoped>
$konva-namespace: konva- !default;
$bg-color: #4C4C4C;
$hl-color: #6F6F6F;

.#{$konva-namespace}toolbar-container {
  display: flex;
  width: 100%;
  height: 40px;
  background: $bg-color;
  .left-side {
    flex: 1;
    background: red;
  }
  .right-side {
    // width: 100%;
  }
}
</style>
