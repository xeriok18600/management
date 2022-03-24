import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || false,
    preLoginComponent: "Login",
    comments: [],
  },
  mutations: {
    setPreLoginComponent(state, payload) {
      state.preLoginComponent = payload;
    },
    setComments(state, payload) {
      state.comments = [...payload];
    },
    setToken(state, payload) {
      sessionStorage.setItem("token", `Bearer ${payload}`);
      state.token = `Bearer ${payload}`;
    },
    logout(state) {
      sessionStorage.removeItem("token");
      state.token = false;
    },
  },
  actions: {},
  modules: {},
});
