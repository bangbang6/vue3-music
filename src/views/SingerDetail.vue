<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>
 
<script>
import MusicList from '../components/musicList/MusicList.vue'
import { getSingerDetail } from '../service/singer'
import storage from 'good-storage'
import { processSongs } from '../service/song'
export default {
  components: { MusicList },
  props: {
    singer: Object
  },
  data () {
    return {
      songs: [],
      loading: false
    }
  },
  computed: {
    computedSinger () {
      let ret = null
      const singer = this.singer
      console.log('singer', singer);
      if (singer.length) {
        ret = singer
      } else {
        const cacheSinger = storage.session.get('singer')
        if (cacheSinger && cacheSinger.mid === this.$route.params.id) {
          ret = cacheSinger
        }
      }
      return ret
    },
    pic () {
      return this.computedSinger && this.computedSinger.pic
    },
    title () {
      return this.computedSinger && this.computedSinger.name
    },
  },
  async created () {
    this.loading = true
    if (!this.computedSinger) this.$router.back()
    const result = await getSingerDetail(this.computedSinger)
    const songs = await processSongs(result.songs)
    this.songs = songs
    this.loading = false
  }
}
</script>
 
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>