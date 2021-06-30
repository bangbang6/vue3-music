<template>
  <div id="nav">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
    <player></player>
  </div>
</template>
<script>
import Header from "@/components/header/Header";
import Tab from "@/components/tab/Tab";
import Player from './components/player/player.vue';

export default {
  components: {
    Header: Header,
    Tab,
    Player,
  },
};
</script>
<style lang="scss"></style>
