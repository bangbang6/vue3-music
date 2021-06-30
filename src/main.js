import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import LoadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import "@/assets/scss/index.scss"
createApp(App).use(store).use(router).use(lazyPlugin,{
  loading:require('@/assets/default.png')
}).directive('loading',LoadingDirective).directive('no-result',noResultDirective).mount("#app");
