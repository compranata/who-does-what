import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wdws: [
      { _id: '001', name: 'Operation Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '002', name: 'Operation Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '003', name: 'Operation Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '004', name: 'Procurement Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '005', name: 'Procurement Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '006', name: 'Procurement Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '007', name: 'Customer Relations Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '008', name: 'Customer Relations Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '009', name: 'Customer Relations Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '010', name: 'Finance Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '011', name: 'Finance Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '012', name: 'Finance Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '013', name: 'Operation Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '014', name: 'Operation Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '015', name: 'Operation Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '016', name: 'Procurement Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '017', name: 'Procurement Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '018', name: 'Procurement Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
      { _id: '019', name: 'Customer Relations Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', unit: 'yksi' },
      { _id: '020', name: 'Customer Relations Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', unit: 'kolme' },
      { _id: '021', name: 'Customer Relations Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', unit: 'nelja' },
      { _id: '022', name: 'Finance Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', unit: 'yksi' },
      { _id: '023', name: 'Finance Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', unit: 'kaksi' },
      { _id: '024', name: 'Finance Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', unit: 'kolme' },
    ],
    entities: [
      { _id: '001', name: 'Berlin Office', address: 'Friedrichstr. 123, 10211 Berlin', country: 'Germany', phone: '+49-30-12345566' },
      { _id: '002', name: 'Frankfurt Office', address: 'Rossmarkt. 6, 60311 Frankfurt', country: 'Germany', phone: '+49-69-3432938' },
      { _id: '003', name: 'London Office', address: 'Goswell Road, London', country: 'United Kingdam', phone: '+44-110202012' },
      { _id: '004', name: 'Barcelona Office', address: 'Calle de Francisco. 123, Barcelona', country: 'Spain', phone: '+36-30-12345566' },
      { _id: '005', name: 'Paris Office', address: 'Rue prima. 6, Paris', country: 'France', phone: '+39-69-3432938' },
      { _id: '006', name: 'Milano Office', address: 'Milano', country: 'Italy', phone: '+42-110202012' },
    ],
    tags: [
      { _id: '001', name: 'Germany', group: 'Europe', label: 'Destinations' },
      { _id: '002', name: 'France', group: 'Europe', label: 'Destinations' },
      { _id: '003', name: 'United Kingdam', group: 'Europe', label: 'Destinations' },
      { _id: '004', name: 'Spain', group: 'Europe', label: 'Destinations' },
      { _id: '005', name: 'Portugal', group: 'Europe', label: 'Destinations' },
      { _id: '006', name: 'Events', group: 'Incentives', label: 'Business' },
      { _id: '007', name: 'Customer Care', group: 'Inbound', label: 'Functions' },
      { _id: '008', name: 'Service Operations', group: 'Inbound', label: 'Functions' },
      { _id: '009', name: 'Sales Operations', group: 'Outbound', label: 'Functions' },
      { _id: '010', name: 'Japanese', group: 'Asia', label: 'Markets' },
      { _id: '011', name: 'Chinese', group: 'Asia', label: 'Markets' },
      { _id: '012', name: 'American', group: 'North America', label: 'Markets' },
    ],
    user: null,
    isAuth: false,
    loading: false,
    error: {},
    tagKeywords: [],
    wdwKeywords: [],
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
    },
    setTagKeys (state, payload) {
      state.tagKeywords.push(...payload);
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
    pushTagKeys ({ commit }, payload) {
      console.log(payload);
      commit('setTagKeys', payload);
      console.log(this.state.tagKeywords)
    }
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
    tagKeywords (state) {
      return state.tagKeywords;
    },
    wdwKeywords (state) {
      return state.wdwKeywords;
    },
    filteredTags (state) {
      return state.tags;
    }
  },
});
