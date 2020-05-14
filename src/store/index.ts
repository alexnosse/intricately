import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'CARDS',
  },
  mutations: {
    setTitle(state, title: string) {
      state.title = title;
    },
  },
  actions: {
    setTitleAction(context, title: string) {
      context.commit('setTitle', title);
    },
  },
  modules: {
  },
});
