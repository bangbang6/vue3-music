import { computed, nextTick, watch,ref } from "vue"

export default function useFixed(props){
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0) //当前组最下面到fixtitle的距离
  const fixedTitle = computed(()=>{
    if(scrollY.value<0) return ''
    const currentUl = props.data[currentIndex.value]
    return currentUl?currentUl.title:''
  })
  //推动fixedTitle向上走
  const fixedStyle = computed(()=>{
    const distanceVal = distance.value
    const diff = distanceVal>0 && distanceVal<30 ?
      distanceVal - 30 : 0
    return {transform:`translate3d(0,${diff}px,0)`}
  })
  
  watch(()=>props.data,async()=>{
    await nextTick()
    calc()
  })
  //判断走到哪个ul
  watch(scrollY,(newY)=>{
    
    let listHeightsVal = listHeights.value
    for(let i = 0;i<listHeightsVal.length-1;i++){
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i+1]
      if(newY>=heightTop && newY<=heightBottom){
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })
  //!计算每个ul的高度起始处 结合当前滚动的y值判断处于哪个ul里
  function calc(){
    const list = groupRef.value.children
    let listHeightsVal = listHeights.value
    listHeightsVal.length = 0
    let height = 0
    listHeightsVal.push(height)
    for(let i = 0;i<list.length;i++){
      height += list[i].clientHeight //拿到每个ul元素的视口高度
      listHeightsVal.push(height)
    }
  }
  function onScroll(pos){
    scrollY.value = -pos.y
  }

  return {
    onScroll,
    groupRef,
    fixedTitle,
    fixedStyle
  }
}
