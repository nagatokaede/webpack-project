'use static';

// import printMe from './print.js';
import './styles.css';
// import { cube } from './math.js';
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});

// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!');
// }
//
// const component = () => {
//   //const element = document.createElement('div');
//   const btn = document.createElement('button');
//   const element = document.createElement('pre');
//
//   // element.innerHTML = 'Hello webpack';
//
//   element.innerHTML = [
//     'Hello webpack!',
//     '5 cubed is equal to ' + cube(5)
//   ].join('\n\n');
//
//   btn.innerHTML = 'click me and check the console!';
//   btn.onclick = printMe;
//
//   element.appendChild(btn);
//
//   return element;
// };
//
// let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
// document.body.appendChild(component());
//
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element)
//   })
// }
