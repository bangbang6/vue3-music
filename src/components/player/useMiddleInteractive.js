import { ref } from "vue"

export default function useMiddleInteractive(){
  const currentShow = ref('cd') //在移动过程中会发生变化
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)
  const touch = {}
  let currentView = 'cd' //在移动过程中不会发生变化 只有当移动结束后变成currentShow 这个变量主要是控制百分之20的页面转变逻辑
  function onMiddleTouchStart(e){
    touch.startX =e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    touch.directionLocked= ''
  }
  function onMiddleTouchMove(e){
    const deltaX = e.touches[0].pageX - touch.startX
    const deltaY = e.touches[0].pageY - touch.startY
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    if(!touch.directionLocked){
      touch.directionLocked = absDeltaX>=absDeltaY?'h':'v'
    }
    if(touch.directionLocked === 'v'){ //纵向偏移
      return 
    }
    const left = currentView === 'cd'?0:-window.innerWidth
    const offsetWidth = Math.min(0,Math.max(left+deltaX,-window.innerWidth)) //歌词页面层的偏移量
    touch.percent = Math.abs(offsetWidth/window.innerWidth) //负方向的偏移比例的绝对值
    if(currentView === 'cd'){
      if(touch.percent >0.2){
        currentShow.value = 'lyric'
      }else{
        currentShow.value = 'cd'

      }
    }else{
      if(touch.percent <0.8){
        currentShow.value = 'cd'
      }else{
        currentShow.value = 'lyric'

      }
    }
    middleLStyle.value = {
      opacity:1-touch.percent,
      transitionDuration:'0ms'
    }
    middleRStyle.value = {
      transform:`translate3d(${offsetWidth}px,0,0)`
    }
  }
  function onMiddleTouchEnd(e){
    let offsetWidth
    let opacity
    if(currentShow.value === 'cd'){
      currentView = 'cd'
      offsetWidth = 0
      opacity=1;
    }else{
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity=0;
    }
    const duration = 300
    middleLStyle.value = {
      opacity:opacity,
      transitionDuration:'300ms'
    }
    middleRStyle.value = {
      transform:`translate3d(${offsetWidth}px,0,0)`,
      transitionDuration:'300ms'

    }
  }
  return {
    middleLStyle,
    middleRStyle,
    currentShow,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  }
}