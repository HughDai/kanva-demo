<template>
  <div class="kt-container">
    <aside class="left-side">
      <ul class="kt-selector-list">
        <li v-for="(selector, i) in selectorList_1" :key="i"
        :class="['kt-selector', 'kt-icon-'+ selector]">
          <popper v-if="i === 4"
            trigger="hover"
            :options="{
              placement: 'top',
              modifiers: { offset: { offset: '0,0px' } }
            }">
            <div class="popper">
              Popper Content
            </div>
            <a class="kt-icon-arrow-30" slot="reference" v-if="i === 4"></a>
          </popper>
        </li>
      </ul>
      <i class="kt-separator"></i>
    </aside>
    <div class="picker">
      
    </div>
    <aside class="right-side">
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li v-for="(selector, i) in selectorList_2" :key="i"
        :class="['kt-selector', 'kt-icon-'+ selector]"></li>
      </ul>
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li v-for="(selector, i) in selectorList_3" :key="i"
        :class="['kt-selector', 'kt-icon-'+ selector]"></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  name: 'Toolbar',
  components: {
    'popper': Popper
  },
  data () {
    return {
      selectorList_1: [
        'mouse', 'brush', 'eraser', 'line', 'rect', 'whiteboard'
      ],
      selectorList_2: [
        'remove', 'clear', 'undo', 'redo'
      ],
      selectorList_3: [
        'reset', 'countdown'
      ],
      showGraphPop: false
    }
  }
}
</script>

<style lang="scss" scoped>
$scope: kt- !default;
$bg-color: #4C4B4E;
$hl-color: #6F6F6F;
$selector-icons: (
  mouse, brush, eraser, line, rect, whiteboard,
  remove, clear, undo, redo, reset, countdown
);
$arrows: up, down;

.#{$scope}container {
  display: flex;
  width: 100%;
  height: 40px;
  background: $bg-color;
  padding: 6px;
  aside {
    display: flex;
  }
  .picker {
    position: absolute;
    left: 200px;
    top: 200px;
  }
  .left-side {
    flex: 1;
    .#{$scope}separator {
      margin-left: 6px;
    }
  }
  .#{$scope}selector-list {
    overflow: hidden;
  }
  .#{$scope}selector {
    float: left;
    width: 28px;
    height: 28px;
    & ~ li{
      margin-left: 2px;
    }
  }
  @for $i from 1 through length($selector-icons) {
    $icon: nth($selector-icons, $i);
    .#{$scope}icon-#{$icon} {
      background: url("~@/assets/images/default/icon-#{$icon}.png") center no-repeat;
      background-size: 100% auto;
      @if $i == 5 {
        width: 46px;
        height: 30px;
        background-position-x: left;
        background-size: 30px auto;
      }
    }
  }
  .right-side {
    .#{$scope}separator {
      &:last-of-type {
        margin-left: 6px;
      }
      margin-right: 6px;
    }
  }
}
.#{$scope}separator {
  width: 8px;
  height: 28px;
  background: url("~@/assets/images/icon-separator.png") center no-repeat;
  background-size: 100% 24px;
}

.#{$scope}icon-arrow-30 {
  display: block;
  float: right;
  width: 16px;
  height: 30px;
  background: url("~@/assets/images/icon-arrow-down_1.png") center no-repeat;
  background-size: 100% auto;
  &:hover {
    background-image: url("~@/assets/images/icon-arrow-up_1.png");
  }
}
.#{$scope}icon-arrow-18 {
  width: 16px;
  height: 18px;
  background: url("~@/assets/images/icon-arrow-down_2.png") center no-repeat;
  background-size: 100% auto;
}
</style>
