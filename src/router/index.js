import { createRouter, createWebHashHistory } from "vue-router";
const Recommend = () => import('@/views/Recommend'/* webpackChunkName: "recommend" */)
const Singer = () => import('@/views/Singer'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/TopList'/* webpackChunkName: "top-list" */)
const Search = () => import('@/views/Search'/* webpackChunkName: "search" */)
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
   
  },
  {
    path: '/singer',
    component: Singer,
   
  },
  {
    path: '/top-list',
    component: TopList,
   
  },
  {
    path: '/search',
    component: Search,
    
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
