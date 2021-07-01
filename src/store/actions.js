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
export function removeSong({commit,state},song){
  const sequenceList = state.sequenceList.slice()
  const playlist = state.playlist.slice()
  const sequenceIndex = sequenceList.findIndex((item)=>{
    return item.id === song.id
  })
  const playIndex = playlist.findIndex((item)=>{
    return item.id === song.id
  })
  if (sequenceIndex < 0 || playIndex < 0) {
    return
  }
  let currentIndex = state.currentIndex
  sequenceList.splice(sequenceIndex,1)
  playlist.splice(playIndex,1)
  if(playIndex<currentIndex || currentIndex === playlist.length){
    currentIndex--
  }
 
  commit('setSequenceList',sequenceList)
  commit('setPlaylist',playlist)
  commit('setCurrentIndex',currentIndex)
  if(!playlist.length){
  commit('setPlayingState', false)

  }
}
export function clearSongList({commit}){
  commit('setSequenceList', [])
  commit('setPlaylist', [])
  commit('setCurrentIndex', 0)
  commit('setPlayingState', false)
}