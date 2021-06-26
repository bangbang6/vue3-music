import get from "./base"
//把所有歌曲的信息加上url字段
export function processSongs(songs){
  if(!songs.length) return Promise.resolve(songs)
  return get('/api/getSongsUrl',{
    mid:songs.map(song=>{
      return song.mid
    })
  }).then(res=>{
    const map = res.map
    return songs.map(song=>{
      song.url = map[song.mid]
      return song
    }).filter(song=>{
      return song.url.indexOf('vkey')>-1
    })
  })
}