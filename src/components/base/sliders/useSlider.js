import BScroll from '@better-scroll/core'
import Slider from '@better-scroll/slide'
import {onMounted, onUnmounted,ref} from 'vue'
BScroll.use(Slider)
export default function useSlider(wrapperRef){
  const slider = ref(null) //slider实例
  let currentPageIndex = ref(0)
  onMounted(()=>{
    slider.value = new BScroll(wrapperRef.value,{ //dom实例
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    slider.value.on('slideWillChange',(page)=>{
      currentPageIndex.value = page.pageX
    })
  })
  onUnmounted(()=>{
    slider.value.destroy()
  })
  return {slider,currentPageIndex}
}