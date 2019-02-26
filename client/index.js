'use static';

// import printMe from './print.js';
import './asset/css/styles.css';
// import { cube } from './math.js';
import Vue from 'vue';
import App from './App.vue';

// 引入路由
import router from "./router.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

