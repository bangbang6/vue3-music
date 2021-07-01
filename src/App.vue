<template>
  <div id="nav">
    <Header></Header>
    <Tab></Tab>
    <router-view :style="viewStyle"></router-view>
    <player></player>
  </div>
</template>
<script>
import Header from "@/components/header/Header";
import Tab from "@/components/tab/Tab";
import Player from './components/player/player.vue';
import { mapState } from 'vuex'
export default {
  components: {
    Header: Header,
    Tab,
    Player,
  },
  computed: {
    viewStyle () {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom
      }
    },
    ...mapState(['playlist'])
  }
};
</script>
<style lang="scss"></style>
