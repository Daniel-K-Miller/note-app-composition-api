import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";

Vue.use(Vuex);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
