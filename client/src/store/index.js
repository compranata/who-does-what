import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wdws: [
      { _id: '001', name: 'Operation Germany', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '002', name: 'Operation Austria', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '003', name: 'Operation Scandinavia', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '004', name: 'Procurement Germany', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '005', name: 'Procurement Austria', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '006', name: 'Procurement Scandinavia', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '007', name: 'Customer Relations Germany', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '008', name: 'Customer Relations Austria', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '009', name: 'Customer Relations Scandinavia', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '010', name: 'Finance Germany', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '011', name: 'Finance Austria', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '012', name: 'Finance Scandinavia', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '013', name: 'Operation Germany', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '014', name: 'Operation Austria', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '015', name: 'Operation Scandinavia', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '016', name: 'Procurement Germany', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '017', name: 'Procurement Austria', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '018', name: 'Procurement Scandinavia', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '019', name: 'Customer Relations Germany', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '020', name: 'Customer Relations Austria', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '021', name: 'Customer Relations Scandinavia', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '022', name: 'Finance Germany', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '023', name: 'Finance Austria', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '024', name: 'Finance Scandinavia', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
    ],
    user: null,
    isAuth: false,
    loading: false,
    error: {},
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
    setUser (state, payload) {
      state.user = payload;
    },
    setIsAuth (state, payload) {
      state.isAuth = payload;
    }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError');
    },
    signupUser ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      const newUser = {
        email: payload.email,
        password: payload.password
      };
      commit('setUser', newUser);
      commit('setIsAuth', true);
      commit('setLoading', false);
    },
    signinUser ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      setTimeout(() => {
        const newUser = {
          id: '1',
          email: payload.email,
          password: payload.password,
        };
        commit('setUser', newUser);
        commit('setIsAuth', true);
        commit('setLoading', false);
      }, 3000);
    },
    autoSignin ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
      });
      commit('setIsAuth', true);
    },

  },
  getters: {
    user (state) {
      return state.user;
    },
    isAuth (state) {
      return state.isAuth;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    },
  },
});
