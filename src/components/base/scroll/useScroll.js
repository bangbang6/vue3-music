import { onMounted,onUnmounted,ref } from "vue"
import BScroll from '@better-scroll/core'
import ObserveDOM from "@better-scroll/observe-dom"
BScroll.use(ObserveDOM)
export default function useScroll(wrapperRef,options){
  const scroll = ref(null)
  onMounted(()=>{
    scroll.value = new BScroll(wrapperRef.value,{
      observeDOM: true,
      ...options
    })
  })
  onUnmounted(()=>{
    scroll.value.destroy()
  })
  return scroll
}
//!容器高度小于内容高度才能滚动 这个也是虚拟dom为什么有一个很高的div用来把内容高度高于容器高度 才能滚动