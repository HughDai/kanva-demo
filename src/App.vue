<template>
  <div id="app">
    <!-- <button @click="addRect">四边形</button>
    <select @change="handleRectModeChange">
      <option value="square">正方形</option>
      <option value="rectangle">长方形</option>
      <option value="rhombus">菱形</option>
      <option value="trapezoid">梯形</option>
    </select>
    <button @click="addCustom">任意多边形</button>
    <button @click="quitCustom">退出任意多边形</button>
    <button @click="addPolygon">多边形</button>
    <input type="text" v-model="side" style="width: 15px;">
    <button @click="addTriangle">三角形</button>
    <select @change="handleTriangleModeChange">
      <option value="equilateral">等边</option>
      <option value="right">直角</option>
      <option value="isosceles">等腰</option>
    </select>
    <button @click="addStraight">直线</button>
    <button @click="addCircle">圆</button>
    <button @click="addCircleWithCenter">圆心圆</button>
    <button @click="addSemicircle">半圆</button>
    <button @click="addCenterSemicircle">圆心半圆</button>
    <button @click="draw('brush')">画笔</button>
    <button @click="draw('eraser')">橡皮</button>
    <button @click="handleModeChange">{{isBrushMode ? '退出画笔' : '画笔模式'}}</button>
    <button @click="preview">预览</button>
    <button @click="remove">删除</button>
    <button @click="clear">清屏</button>
    <button @click="undo">撤销</button>
    <button @click="redo">重做</button>
    <label>填充</label>
    <select @change="handleFillChange">
      <option value="">空心</option>
      <option value="red">红色</option>
    </select>
    <label>描边</label>
    <select @change="handleStrokeChange">
      <option value="red">红色</option>
      <option value="black">黑色</option>
    </select>
    <label>虚实线</label>
    <select @change="handleDashChange">
      <option value="0">实线</option>
      <option value="1">虚线</option>
    </select>
    <label>线宽</label>
    <select @change="handleStrokeWidthChange">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
    <br><br><br> -->
    <div id="toolbar-wrapper">
      <toolbar></toolbar>
    </div>
    <!-- <div class="bg">
      <button>test124344234234</button>
    </div> -->
    <stage ref="stage"></stage>
  </div>
</template>

<script>
/* eslint-disable */ 
import { mapState, mapMutations } from 'vuex'
import Line from '@/elements/line'
import Brush from '@/elements/brush'
import Circle from '@/elements/circle'
import Semicircle from '@/elements/semicircle'
import Polygon from '@/elements/polygon'
import Triangle from '@/elements/triangle'
import Rect from '@/elements/rect'
import Custom from '@/elements/custom'
import toolbar from '@/components/toolbar'
import stage from '@/components/stage'
import { TriangleSceneFunc, RectSceneFunc, PolygonSceneFunc, CustomLayer } from '@/elements/util'

export default {
  name: "App",
  data () {
    return {
      currentStage: null
    }
  },
  components: {
    toolbar,
    stage
  },
  mounted () {
    this.currentStage = this.$refs.stage
  },
}
</script>

<style lang="scss">
@import '~@/assets/styles/reset.scss';

#app {
  position: relative;
  // width: 1000px;
  // height: 750px;
}
#toolbar-wrapper {
  /* position: absolute;
  left: 0;
  top: 0; */
}
.bg {
  z-index: 1;
  position: absolute;
  width: 1000px;
  height: 500px;
  border: 1px solid black;
  background: url(http://test-ic-static.vipkid.com.cn/course/materialVIPKID16_9/FX22-L2-U1-LC2-1/4b7dc354b9d088f1e134be7cf35790ac.jpg) center/1000px 750px no-repeat;
}
#container {
  width: 800px;
  height: 600px;
  border: 1px solid red;
}
#preview {
  position: absolute;
  top: 100px;
  left: 750px;
  width: 250px;
  height: 187.5px;
  border: 1px solid red;
}
</style>
