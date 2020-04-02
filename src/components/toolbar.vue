<template>
  <div class="kt-container">
    <aside class="left-side">
      <ul class="kt-selector-list">
        <template v-for="(selector, i) in selectorList_1">
          <li :key="i + 'li'" :class="['kt-selector', 'kt-icon-'+ selector, {'kt-icon-square-default': i === 4}]"></li>
          <popper offset="0,6px" v-if="i === 4"  :key="i + 'popper'">
            <ul slot="content" class="popper-content popper-graph">
              <li v-for="(graph, j) in graphs" :key="j" :class="'kt-icon-graph-'+ graph.name"></li>
            </ul>
            <a class="kt-icon-arrow-30" slot="reference"></a>
          </popper>
        </template>
      </ul>
      <i class="kt-separator"></i>
    </aside>
    <div class="middle-side">
      <div class="stroke-width-picker">
        <div class="kt-icon-sw-medium-default"></div>
        <popper offset="0,11px">
          <ul slot="content" class="popper-content popper-sw">
            <li v-for="i in ['small', 'medium', 'large']" :key="i" :class="'kt-icon-sw-'+ i"></li>
          </ul>
          <a class="kt-icon-arrow-18" slot="reference"></a>
        </popper>
      </div>
      <div class="line-dash-picker">
        <div class="kt-icon-line-solid-default"></div>
        <popper offset="0,11px">
          <ul slot="content" class="popper-content popper-line">
            <li v-for="i in ['dash', 'solid']" :key="i" :class="'kt-icon-line-'+ i"></li>
          </ul>
          <a class="kt-icon-arrow-18" slot="reference"></a>
        </popper>
      </div>
      <ul class="eraser-width-picker">
        <li v-for="i in ['small', 'medium', 'large']" :key="i" :class="'kt-icon-eraser-'+ i"></li>
      </ul>
      <div class="stroke-color-picker">

      </div>
    </div>
    <aside class="right-side">
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li v-for="(selector, i) in selectorList_2" :key="i"
        :class="['kt-selector', 'kt-icon-'+ selector]"></li>
      </ul>
      <i class="kt-separator"></i>
      <ul class="kt-selector-list">
        <li slot="reference" class="kt-selector kt-icon-reset"></li>
        <popper offset="0,6px">
          <ul slot="content" class="popper-content popper-countdown">
            <li>15s</li>
            <li>30s</li>
            <li>60s</li>
          </ul>
          <li slot="reference" class="kt-selector kt-icon-countdown"></li>
        </popper>
      </ul>
    </aside>
  </div>
</template>

<script>
import popper from './popper'

export default {
  name: 'Toolbar',
  components: {
    popper
  },
  data () {
    return {
      selectorList_1: [
        'mouse', 'brush', 'eraser', 'line', 'square', 'whiteboard'
      ],
      selectorList_2: [
        'remove', 'clear', 'undo', 'redo'
      ],
      graphs: [
        { name: 'equilateral', class: 'Triangle' },
        { name: 'right', class: 'Triangle' },
        { name: 'isosceles', class: 'Triangle' },
        { name: 'square', class: 'Rect' },
        { name: 'rectangle', class: 'Rect' },
        { name: 'rhombus', class: 'Rect' },
        { name: 'trapezoid', class: 'Rect' },
        { name: 'circle', class: 'Cirlce' },
        { name: 'semicircle', class: 'Semicircle' },
        { name: 'custom', class: 'Custom' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$scope: kt- !default;
$bg-color: #4C4B4E;
$hl-color: #6F6F6F;
$default-color: #1D232A;
@mixin hl {
  background-color: $hl-color;
  border-radius: 2px;
}
$selector-icons: (
  mouse, brush, eraser, line, square, whiteboard,
  remove, clear, undo, redo, reset, countdown
);
$graph-icons: (
  equilateral, right, isosceles, square, rectangle,
  rhombus, trapezoid, circle, semicircle, custom
);

.#{$scope}container {
  display: flex;
  width: 100%;
  height: 40px;
  background: $bg-color;
  padding: 0 6px;
  aside {
    display: flex;
  }
  .left-side {
    .#{$scope}separator {
      margin-left: 6px;
      margin-right: 12px;
    }
  }
  .#{$scope}selector-list {
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .#{$scope}selector {
    width: 28px;
    height: 28px;
    & ~ li{
      margin-left: 2px;
    }
  }
  @for $i from 1 through length($selector-icons) {
    $icon: nth($selector-icons, $i);
    .#{$scope}icon-#{$icon} {
      @if $i != 5 {
        background: url("~@/assets/images/default/icon-#{$icon}.png") center no-repeat;
        background-size: 100% auto;
      } @else {
        width: 30px;
        height: 30px;
      }
      &:hover {
        @include hl;
      }
    }
  }
  .middle-side {
    flex: 1;
    display: flex;
  }
  .stroke-width-picker, .line-dash-picker, .eraser-width-picker {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  .eraser-width-picker {
    li {
      width: 28px;
      height: 28px;
      margin-right: 2px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        @include hl;
      }
    }
  }
  @each $icon in small, medium, large {
    .#{$scope}icon-sw-#{$icon} {
      width: 28px;
      height: 28px;
      background: url("~@/assets/images/icon-sw-#{$icon}.png") center no-repeat;
      background-size: 100% auto;
    }
    .#{$scope}icon-sw-#{$icon}-default {
      width: 30px;
      height: 24px;
      background: url("~@/assets/images/icon-sw-#{$icon}-default.png") center no-repeat;
      background-size: 100% auto;
    }
    .#{$scope}icon-eraser-#{$icon} {
      width: 28px;
      height: 28px;
      background: url("~@/assets/images/icon-eraser-#{$icon}.png") center no-repeat;
      background-size: 100% auto;
    }
  }
  @each $icon in dash, solid {
    .#{$scope}icon-line-#{$icon} {
      width: 28px;
      height: 28px;
      background: url("~@/assets/images/icon-line-#{$icon}.png") center no-repeat;
      background-size: 100% auto;
    }
    .#{$scope}icon-line-#{$icon}-default {
      width: 30px;
      height: 24px;
      background: url("~@/assets/images/icon-line-#{$icon}-default.png") center no-repeat;
      background-size: 100% auto;
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
  height: 100%;
  background: url("~@/assets/images/icon-separator.png") center no-repeat;
  background-size: 100% 24px;
}

.#{$scope}icon-arrow-30 {
  display: block;
  width: 16px;
  height: 30px;
  background: url("~@/assets/images/icon-arrow-down_1.png") center no-repeat;
  background-size: 100% auto;
  &:hover {
    background-image: url("~@/assets/images/icon-arrow-up_1.png");
  }
}
.#{$scope}icon-arrow-18 {
  display: block;
  width: 16px;
  height: 18px;
  background: url("~@/assets/images/icon-arrow-down_2.png") center no-repeat;
  background-size: 100% auto;
  &:hover {
    background-image: url("~@/assets/images/icon-arrow-up_2.png");
  }
}

@for $i from 1 through length($graph-icons) {
  $icon: nth($graph-icons, $i);
  .#{$scope}icon-graph-#{$icon} {
    background: url("~@/assets/images/default/icon-#{$icon}.png") center no-repeat;
    background-size: 100% auto;
    &:hover {
      @include hl;
    }
  }
  .#{$scope}icon-#{$icon}-default {
    width: 30px;
    height: 30px;
    background: url("~@/assets/images/default/icon-#{$icon}-default.png") center no-repeat;
    background-size: 100% auto;
    &:hover {
      @include hl;
    }
  }
}

.popper-content {
  display: flex;
  height: 40px;
  background: $bg-color;
  align-items: center;
  border-radius: 4px;
  li:hover {
    @include hl;
  }
}
.popper-graph, .popper-sw, .popper-line {
  padding: 0 6px;
  li {
    width: 28px;
    height: 28px;
    margin-right: 6px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.popper-countdown {
  width: 112px;
  font-size: 11px;
  color: #ffffff;
  justify-content: space-around;
}
.#{scope}hl {
  @include hl;
}
</style>
