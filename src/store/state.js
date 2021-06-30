import { load } from "../assets/js/array-store"

const state  = {
  sequenceList:[],//歌曲列表 
  playlist:[],//真正播放列表 包含啦顺序的
  playing:false,//是否在播放
  playMode:0,//播放模式 0-顺序播放 1-随机播放 2-循环播放
  currentIndex:0,//当前播放的歌曲index
  fullScreen:false,//播放器是否全屏展示
  favoriteList:load('__favorite__')
}
export default state