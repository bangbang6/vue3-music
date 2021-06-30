import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default function useCd(){
  const store = useStore()
  const playing = computed(()=>store.state.playing)
  const cdRef = ref(null)
  const cdImageRef = ref(null)
  const cdClass = computed(()=>{
    return playing.value?'playing':''
  })
  watch(playing,(newPlaying)=>{
    if(!newPlaying.value){
      syncTransform(cdRef.value,cdImageRef.value)
    }
  })
  function syncTransform(wrapper,inner){
    const wrapperTransform = getComputedStyle(wrapper).transform //外层的旋转的角度
    const innerTransform = getComputedStyle(inner).transform //内层已经旋转的角度的角度
    wrapper.style.transform = wrapperTransform === 'none'?innerTransform:innerTransform.concat("",wrapperTransform)
    //暂停的时候让外层旋转那么多 为什么是让外层旋转这么多 因为内层playing类他的初始值为transform:0 如果这时候还是给内层 那么就会覆盖 还是从0开始转 所以我们得给外层 然后内层相当于外层的角度从0开始转 //外层角度加上相对于外层的角度
  }
  return {
    cdClass,
    cdRef,
    cdImageRef,

  }
}