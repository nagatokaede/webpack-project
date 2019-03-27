'use static';

// import printMe from './print.js';
import './asset/css/styles.css';
// import { cube } from './math.js';
import Vue from 'vue';
import App from './App.vue';
import * as service from './service';
import store from './store';

// 引入路由
import router from "./router.js"

Vue.prototype.$axios = service;


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

