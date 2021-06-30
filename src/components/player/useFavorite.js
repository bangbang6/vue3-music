import { computed } from "vue";
import { useStore } from "vuex";
import { remove, save } from "../../assets/js/array-store";

export default function useFavorite(){
  const store = useStore()
  const favoriteList = computed(()=>store.state.favoriteList)
  function getFavoriteIcon(song){
    return isFavorite(song)?'icon-favorite':'icon-not-favorite'
  }
  function isFavorite(song){
    return favoriteList.value.findIndex(item=>{
      return item.id === song.id
    })>-1
  }
  
  function toggleFavorite(song){
    let list
    function compare(item){
      return item.id === song.id
    }                                       
    if(isFavorite(song)){
      list= remove('__favorite__',compare)
    }else{
      list = save('__favorite__',song,compare)
    }
    store.commit('setFavoriteList',list)
  }
  return {
    toggleFavorite,
    getFavoriteIcon,
    toggleFavorite
  }
}