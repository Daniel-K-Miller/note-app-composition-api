import Vuex from 'vuex';
import Vue from 'vue';

import * as actions from "./actions.js";
import * as getters from "./getters.js";
import * as mutations from "./mutations.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDarkMode: false
  },
  actions,
  getters,
  mutations
})

export {
  store
}