import { computed, ref } from "vue";

export function useShortCut(props,groupRef){
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })
 
  const touch = {}
  function onShortcutTouchstart(e){
    let index = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.index = index
    if(isNaN(index)) return
    index = Math.max(0,Math.min(shortcutList.value.length-1,index))

    const targetEl = groupRef.value.children[index] //第几个组的元素

    const scroll = scrollRef.value.scroll //scroll实例
    scroll.scrollToElement(targetEl)
  }
  function onShortcutTouchmove(e){
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2-touch.y1)/18 | 0 //取整
    let index = touch.index+delta
    if(isNaN(index)) return

    index = Math.max(0,Math.min(shortcutList.value.length-1,index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll //scroll实例 //第几个组的元素
    scroll.scrollToElement(targetEl)
  }
  function onShortcutTouchend(e){
    const index = parseInt(e.target.dataset.index)
    const targetEl = groupRef.value.children[index] //第几个组的元素
    const scroll = scrollRef.value.scroll //scroll实例
    scroll.scrollToElement(targetEl)
  }
  return {shortcutList,onShortcutTouchstart,onShortcutTouchmove,onShortcutTouchend,scrollRef}
}