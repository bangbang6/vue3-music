import { computed } from 'vue'
import {useStore } from 'vuex'
export default function useMode(){
    const store = useStore()
    const playMode = computed(()=>store.state.playMode)
    const modeIcon = computed(()=>{
      const playModeVal = playMode.value
      return playMode.value === 0?'icon-sequence':playMode.value ===1?'icon-random':'icon-loop'
    })
    return {
      modeIcon
    }
}