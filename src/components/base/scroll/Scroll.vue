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
    }
  },
  setup (props) {
    const rootRef = ref(null)
    useScroll(rootRef, props)
    return {
      rootRef
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>