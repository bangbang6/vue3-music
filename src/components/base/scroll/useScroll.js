import { onMounted,onUnmounted,ref } from "vue"
import BScroll from '@better-scroll/core' //BScroll 不是一个组件而是一个类 所以要自己封装一个组件 类似echrts
import ObserveDOM from "@better-scroll/observe-dom"
BScroll.use(ObserveDOM)
export default function useScroll(wrapperRef,options,emit){
  const scroll = ref(null)
  onMounted(()=>{
    scroll.value = new BScroll(wrapperRef.value,{
      observeDOM: true,
      ...options
    })
    if(options.probeType>0){
      scroll.value.on('scroll',(pos)=>{
        emit('scroll',pos) //这个组件派发scroll事件
      })
    }
  })
  onUnmounted(()=>{
    scroll.value.destroy()
  })
  return scroll
}
//!容器高度小于内容高度才能滚动 这个也是虚拟dom为什么有一个很高的div用来把内容高度高于容器高度 才能滚动