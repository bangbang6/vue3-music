<template>
  <div class="singer" v-loading:[LoadingText]="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <!-- 实现路由切换的slide动画 -->
        <component :is="Component" :singer="singer" />
      </transition>
    </router-view>
  </div>
</template>
 
<script>
import { getSingerList } from '../service/singer'
import IndexList from '../components/base/indexList/IndexList.vue'
import storage from 'good-storage'
export default {
  components: { IndexList },
  data () {
    return {
      singers: [],
      LoadingText: '梦晚',
      singer: {}
    }
  },
  async created () {

    let res = await getSingerList()
    console.log('res', res);
    this.singers = res.singers


  },
  methods: {
    selectSinger (singer) {
      this.singer = singer
      storage.session.set('singer', singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    }
  }
}
</script>
 
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>