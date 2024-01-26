// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Ваше глобальное состояние
    count: 123,
    snackbar: false,
    snackbarError: false,
    snackbarText: "Hello yo",
    vertical: true,
  },
  mutations: {
    // Мутации изменяют состояние синхронно
    increment(state) {
      state.snackbar = false;
    },
  },
  actions: {
    // Действия могут содержать асинхронные операции и вызывать мутации
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
  getters: {
    // Геттеры могут использоваться для вычисляемых свойств состояния
    squaredCount: state => state.count * state.count,
  },
});