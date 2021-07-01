import { computed } from 'vue'
import {useStore } from 'vuex'
export default function useMode(){
    const store = useStore()
    const playMode = computed(()=>store.state.playMode)
    const modeIcon = computed(()=>{
      const playModeVal = playMode.value
      return playMode.value === 0?'icon-sequence':playMode.value ===1?'icon-random':'icon-loop'
    })
    const modeText = computed(()=>{
      const playModeVal = playMode.value
      return playMode.value === 0?'顺序播放':playMode.value ===1?'随机播放':'单曲循环' 
    })
    function changeMode () {
      let mode = (playMode.value + 1) % 3
      store.dispatch('changeMode', mode) //dispatch都是action
    }
    return {
      modeIcon,
      modeText,
      changeMode
    }
}