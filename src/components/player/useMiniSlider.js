import { computed, onMounted, ref, watch,nextTick, onUnmounted } from "vue";
import { useStore } from "vuex";
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/Slide'
BScroll.use(Slide)
export default function useMiniSlider(){
    const sliderWrapperRef = ref(null)
    const store = useStore()
    const fullScreen = computed(()=>store.state.fullScreen)
    const playlist = computed(()=>store.state.playlist)
    const currentIndex = computed(()=>store.state.currentIndex)
    const slider = ref(null)
    const sliderShow = computed(()=>{
      return !fullScreen.value && !!playlist.value
    })

    onMounted(()=>{
    let sliderVal

      watch(sliderShow,async (newSliderShow)=>{
        if(newSliderShow){
          //!初始化betterscroll插件
          await nextTick()
          if(!sliderVal){
            sliderVal = slider.value = new BScroll(sliderWrapperRef.value,{
              click:true,
              scrollX:true,//横向滚动
              scrollY:false,
              momentum:false,
              bounce:false,
              probeType:2,
              slide:{
                autoplay:false,
                loop:true
              }
            })
            sliderVal.on('slidePageChanged',({pageX})=>{
              store.commit('setCurrentIndex',pageX)
              
            })
          }else{
            sliderVal.refresh()
          }
          sliderVal.goToPage(currentIndex.value,0,0) //显示的是我们当前的歌曲
        }
      })
      watch(currentIndex,(newIndex)=>{
        if(sliderVal && sliderShow.value){
          sliderVal.goToPage(newIndex,0,0)
        }
      })
      watch(playlist,async (newList)=>{
        if(sliderVal && sliderShow.value && newList.length){
          await nextTick() //我们删掉一个列表 但是可能miniplayer的slider里面数据没变 所以得等dom变化后再去refresh计算slider
          
          sliderVal.refresh()
        }
      })
    })
    onUnmounted(()=>{
      if(slider.value){
        slider.value.destroy()
      }
    })
    return {
      sliderWrapperRef,
      slider
    }
}