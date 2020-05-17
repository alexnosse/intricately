import Vue from 'vue';
import Vuex from 'vuex';
import CardModel from '@/models/Card';

Vue.use(Vuex);
interface State {
  title: string;
  cards: Array<CardModel>;
  rotation: CardModel;
}

export default new Vuex.Store({
  state: {
    title: 'CARDS',
    cards: [],
    rotation: {} as CardModel,
  } as State,
  mutations: {
    setTitle(state, title: string) {
      state.title = title;
    },
    setCards(state, cards: Array<CardModel>) {
      state.cards = cards;
    },
    clearCards(state) {
      state.cards = [];
    },
    setRotation(state, rotation: CardModel) {
      state.rotation = rotation;
    },
    clearRotation(state) {
      state.rotation = {} as CardModel;
    },
  },
  actions: {
    setTitle(context, title: string) {
      context.commit('setTitle', title);
    },
    setCards(context, cards: Array<CardModel>) {
      context.commit('setCards', cards);
    },
    clearCards(context) {
      context.commit('clearCards');
    },
    setRotation(context, rotation: CardModel) {
      context.commit('setRotation', rotation);
    },
    clearRotation(context) {
      context.commit('clearRotation');
    },
  },
  modules: {
  },
});
