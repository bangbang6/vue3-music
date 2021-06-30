import { computed, watch,ref } from "vue";
import { useStore } from "vuex";
import { getLyric } from "../../service/song";
import Lyric from 'lyric-parser'

export default function useLyric({songReady,currentTime}){
  const pureMusicLyric = ref('')

  const store = useStore()
  const currentLyric = ref(null)
  const playingLyric = ref(null)
  const currentLineNum = ref(null)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  const currentSong = computed(()=>store.getters.currentSong)
  function handleLyric({lineNum,txt}){ //每执行完一行都会执行这个函数
    playingLyric.value = txt
    currentLineNum.value = lineNum //!这个是当歌词每走一行 我们让dom结构也走一行 还没和currentTime挂钩
    const scrollCmp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if(!listEl){
      return
    }
    if(lineNum > 5){
      const lineEl = listEl.children[lineNum-5] 
      scrollCmp.scroll.scrollToElement(lineEl,1000) //滚动到五行之前的内容 保证该行内容是在中间
    }else{
      scrollCmp.scroll.scrollToElement(0,0,1000)
    }
  }
  function playLyric(){
    const currentLyricVal = currentLyric.value
    if(currentLyricVal){
      currentLyricVal.seek(currentTime.value * 1000) //歌词跳到当前的播放时间 同步当前的播放时间 这个只是同步开始播放歌词和歌曲的播放的时间
    }
  }
  function stopLyric(){ //歌曲暂停 歌词播放也暂停 把歌词播放当作和歌曲播放一样就行
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }
  watch(currentSong,async (newSong)=>{
    if(!newSong.url || !newSong.id){
      return
    }
    stopLyric() 
    currentLyric.value = null//!currentLyric可能还是前一个lyric 所以我们清空之前的 然后重新获取lyric
    currentLineNum.value = 0
    const lyric = await getLyric(newSong)
    store.commit('addSongLyric',{lyric,song:newSong})
    if(currentSong.value.lyric !== lyric){
      return
    }
    currentLyric.value = new Lyric(lyric,handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if(hasLyric){
      if(songReady.value){//歌曲准备好再去歌词执行
        playLyric()
      }
    }else{
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
    }
  
  })
  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopLyric,
    pureMusicLyric,
    playingLyric
  }
}