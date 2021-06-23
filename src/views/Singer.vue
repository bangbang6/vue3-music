<template>
  <div class="singer" v-loading:[LoadingText]="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>
 
<script>
import { getSingerList } from '../service/singer'
import IndexList from '../components/base/indexList/IndexList.vue'
export default {
  components: { IndexList },
  data () {
    return {
      singers: [],
      LoadingText: '梦晚'
    }
  },
  async created () {

    let res = await getSingerList()
    console.log('res', res);
    this.singers = res.singers


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