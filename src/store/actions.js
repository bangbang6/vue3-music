import { shuffle } from "../assets/js/utils"

//初始化传入一个列表和现在播放第几个歌曲
export function selectPlay({commit},{list,index}){
  commit('setPlayMode',0)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}
export function randomPlay({commit},{list}){
  commit('setPlayMode',2)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)

}
export function changeMode({commit,state,getters},mode){
  const currentId = getters.currentSong.id
  //随机播放
  if(mode === 1){
    commit('setPlaylist',shuffle(state.sequenceList))
  }else{
    commit('setPlaylist',state.sequenceList)

  }
  const index = state.playlist.findIndex(song=>{
    return song.id === currentId
  })
  commit('setCurrentIndex',index)
  commit('setPlayMode',mode)

}