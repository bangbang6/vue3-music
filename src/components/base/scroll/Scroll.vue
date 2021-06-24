<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>
 
<script>
import { ref } from '@vue/reactivity'
//!这个组件直接把内容传进来 主要是实现丝滑的滚动逻辑
import useScroll from './useScroll'

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'], //自定义事件 表示这个组件会向外派发这个事件
  setup (props, { emit }) {
    const rootRef = ref(null)
    const {scroll} =  useScroll(rootRef, props, emit)
    return {
      rootRef,
      scroll
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>