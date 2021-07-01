import { ref } from "vue";
import animations from 'create-keyframe-animation'
export default function useAnimation(){
  let entering = false

  let leaving = false
  const cdWrapperRef = ref(null)
  function enter(el,done){
    if (leaving) {
      afterLeave()
    }
    entering = true
    const {x,y,scale} = getPosAndScale()
    const animation = {
      0:{
        transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      100:{
        transform:`translate3d(0,0,0) scale(1)`
      },
    }//从小到大的动画
    animations.registerAnimation({
      name:"move",
      animation,
      presets:{
        duration:600,
        easing:'cubic-bezier(0.45,0,0.55,1)'
      }
    })
    animations.runAnimation(cdWrapperRef.value,'move',done)
  }
  function afterEnter(){
    entering = false

    animations.unregisterAnimation('move')
    cdWrapperRef.value.animation = ''
  }
  function leave(el, done){
    if (entering) {
      afterEnter() //手动执行enter动画 以防执行leave的时候enter还没执行完
    }
    leaving = true

    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})` //从大到小动画
    cdWrapperEl.addEventListener('transitionend', next)
    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }
  function afterLeave(){
    leaving = false

    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }
  function getPosAndScale(){
    const targetWidth = 40
    const paddingLeft = 40 //小cd距离左边的距离
    const paddingBottom = 30//小cd距离下边的距离
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const x = -(window.innerWidth /2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width
    return {
      scale,
      x,
      y
    }
  }
  return {
    enter,
    afterEnter,
    leave,
    afterLeave,
    cdWrapperRef
  }
}