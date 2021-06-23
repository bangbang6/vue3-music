

import get from "./base";

/**
 *轮播图和推荐歌单的接口
 * @export
 */
export function getRecommend(){
  return get('/api/getRecommend')
}