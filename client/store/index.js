'use static';

import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    userInfo: null,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setUserInfo(state, data) {
      if (data) {
        state.userInfo = data;
      } else {
        state.userInfo = null;
      }
    }
  }
});

export default store;
