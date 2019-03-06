import Vue from 'vue'
import Vuex from 'vuex'
import fb from '@/store/firebase'

Vue.use(Vuex)
console.log('store.js after Vue.use(vuex)');

export default new Vuex.Store({
  strict: false,
  state: {
    cards: [
      { _id: '001', name: 'Operation Germany', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'brand' },
      { _id: '002', name: 'Operation Austria', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'premium' },
      { _id: '003', name: 'Operation Scandinavia', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'diamond' },
      { _id: '004', name: 'Procurement Germany', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'brand' },
      { _id: '005', name: 'Procurement Austria', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'brand' },
      { _id: '006', name: 'Procurement Scandinavia', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'diamond' },
    ],
    apiUrl: 'https://localhost:8081',
    user: null,
    isAuthenticated: false,
  },
  getters:{
    currentUser: state => {
      return { email: state.user, isAuth: state.isAuthenticated }
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    userJoin({ commit }, { email, password }) {
      fb.auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogin({ commit }, { email, password }) {
      fb.auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogoff({ commit }) {
      fb.auth
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
  },
})
