'use static';

import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from "./page/Home.vue";
import Tool from "./page/Tool.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path:"/home",
    component: Home
  },
  {
    path:"/tool",
    component: Tool
  },
  // 重定向
  {
    path: '/',
    redirect: '/home'
  }
];

const router =  new VueRouter({
  routes
});

export default router;
