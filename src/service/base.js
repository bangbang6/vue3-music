import axios from 'axios'
const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ustbhuangyi.com/music-next/' : '/'
axios.defaults.baseURL = baseURL

export default function get(url,params){
  return axios.get(url,{params}).then(res=>{
    const serverData = res.data
    if (serverData.code === ERR_OK) { //直接在这里统一封装 最终返回出去的是一个封装啦错误处理的promise
      return serverData.result //!最终返回数据
    }
  }).catch(e=>{
    console.log('e',e);
  })
}