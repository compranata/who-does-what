export default {
  state: {
    loading: false,
    error: null,
    infos: { message: 'Welcome!'},
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    },
    setInfos (state, payload) {
      state.infos = payload;
    }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError');
    },
    clearInfos ({ commit }) {
      commit('setInfos', null);
    },
  },
  getters: {
    loading: (state) => {
      return state.loading;
    },
    error: (state) => {
      return state.error;
    },
    infos: (state) => {
      return state.infos;
    },
  },
}
