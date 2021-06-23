<template>
  <div id="nav">
    <Header></Header>
    <Tab></Tab>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "@/components/header/Header";
import Tab from "@/components/tab/Tab";

export default {
  components: {
    Header: Header,
    Tab,
  },
};
</script>
<style lang="scss"></style>
