<template>
  <scroll class="index-list" ref="scrollRef" :probe-type="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="item" @click="e=>handleClick(item)">
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle.length" :style="fixedStyle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchstart"
      @touchmove.stop.prevent="onShortcutTouchmove"
      @touchend.stop.prevent="onShortcutTouchend"
    >
      <!--  阻止冒泡 因为你也是在列表里面滑动 我们不能让列表滑动 -->
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{'current':currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
//!歌手列表
import Scroll from '@/components/base/scroll/Scroll'
import useFixed from './useFixed'
import { useShortCut } from './useShortCut'
export default {
  name: 'index-list',
  components: { Scroll },
  emits:['select'],//!这个组件有哪些自定义事件 因为都是一个组件
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props) //固定标题相关的逻辑
    //右侧快速入口的逻辑
    const { shortcutList, scrollRef, onShortcutTouchstart, onShortcutTouchmove } = useShortCut(props, groupRef)
    function handleClick (item) {
      emit('select',item)
    }
    return { groupRef, onScroll, fixedTitle, fixedStyle, shortcutList, currentIndex, scrollRef, onShortcutTouchstart, onShortcutTouchmove, handleClick }
  }
}
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
