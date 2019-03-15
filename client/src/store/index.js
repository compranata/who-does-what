import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wdws: [
      { _id: '001', name: 'Operation Germany', entities: '001', phone: '+49-69-123123-99', mail: 'germany@mail.com', lead: 'John', tags: ['Events', 'germany'], unit: 'yksi' },
      { _id: '002', name: 'Operation Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', tags: ['Events', 'France'], unit: 'kolme' },
      { _id: '003', name: 'Operation Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', tags: ['Events', 'France'], unit: 'nelja' },
      { _id: '004', name: 'Procurement Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', tags: ['Events', 'Spain'], unit: 'yksi' },
      { _id: '005', name: 'Procurement Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', tags: ['Events', 'Portugal'], unit: 'kaksi' },
      { _id: '006', name: 'Procurement Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', tags: ['Events', 'France'], unit: 'kolme' },
      { _id: '007', name: 'Customer Relations Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', tags: ['Events', 'United Kingdam'], unit: 'yksi' },
      { _id: '008', name: 'Customer Relations Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', tags: ['Events', 'Germany'], unit: 'kolme' },
      { _id: '009', name: 'Customer Relations Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', tags: ['Events', 'Germany'], unit: 'nelja' },
      { _id: '010', name: 'Finance Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', tags: ['Events', 'Germany'], unit: 'yksi' },
      { _id: '011', name: 'Finance Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', tags: ['Events', 'Germany', 'portugal'], unit: 'kaksi' },
      { _id: '012', name: 'Finance Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', tags: ['Events', 'France'], unit: 'kolme' },
      { _id: '013', name: 'Operation Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', tags: ['Events', 'Germany'], unit: 'yksi' },
      { _id: '014', name: 'Operation Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', tags: ['Events', 'Germany'], unit: 'kolme' },
      { _id: '015', name: 'Operation Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', tags: ['Events', 'Germany'], unit: 'nelja' },
      { _id: '016', name: 'Procurement Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', tags: ['Events', 'Germany'], unit: 'yksi' },
      { _id: '017', name: 'Procurement Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', tags: ['Events', 'Spain'], unit: 'kaksi' },
      { _id: '018', name: 'Procurement Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', tags: ['Events', 'Germany'], unit: 'kolme' },
      { _id: '019', name: 'Customer Relations Germany', entities: '001', phone: '+49-69-123123-10', mail: 'germany@mail.com', lead: 'John', tags: ['Events', 'Germany', 'Chinese'], unit: 'yksi' },
      { _id: '020', name: 'Customer Relations Austria', entities: '001', phone: '+49-69-123123-20', mail: 'austria@mail.com', lead: 'Susi', tags: ['Events', 'Germany'], unit: 'kolme' },
      { _id: '021', name: 'Customer Relations Scandinavia', entities: '001', phone: '+49-69-123123-30', mail: 'scandinavia@mail.com', lead: 'Matt', tags: ['Events', 'Germany'], unit: 'nelja' },
      { _id: '022', name: 'Finance Germany', entities: '001', phone: '+49-69-123123-50', mail: 'p.germany@mail.com', lead: 'Angela', tags: ['Events', 'Germany', "service operations"], unit: 'yksi' },
      { _id: '023', name: 'Finance Austria', entities: '001', phone: '+49-69-123123-60', mail: 'p.austria@mail.com', lead: 'Pius', tags: ['Events', 'Germany'], unit: 'kaksi' },
      { _id: '024', name: 'Finance Scandinavia', entities: '001', phone: '+49-69-123123-70', mail: 'p.scandinavia@mail.com', lead: 'Robert', tags: ['Events', 'Germany', 'sales operations'], unit: 'kolme' },
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
    leads: [
      { _id: '100', name: 'John', phone: '', mail: 'john@mail.com', user_id: 'asdf'},
      { _id: '200', name: 'Mike', phone: '', mail: 'mike@mail.com', user_id: 'qwer'},
      { _id: '300', name: 'Mia', phone: '', mail: 'mia@mail.com', user_id: 'jkly'},
      { _id: '400', name: 'Maria', phone: '', mail: 'maria@mail.com', user_id: 'uiop'},
    ],
    loading: false,
    error: {},

    user: null,
    isAuth: false,

    isFiltered: false,
    filterStyle: 'OR',
    filterQuery: [],

    searchQuery: [],
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

    setFilterStyle (state, payload) {
      state.filterStyle = payload;
    },
    setFilterQuery (state, payload) {
      state.filterQuery.push(payload);
    },
    removeFilterQuery (state, payload) {
      state.filterQuery.splice(state.filterQuery.indexOf(payload), 1);
    },
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

    toggleFilterStyle({ commit }, payload) {
      commit('setFilterStyle', payload);
    },
    pushFilterQuery({ commit }, payload) {
      const currentKeys = this.getters.filterQuery;
      for (let key in currentKeys) {
        if (currentKeys[key].label === payload.label && currentKeys[key].group === payload.group) {
          commit('removeFilterQuery', currentKeys[key]);
        }
      }
      commit('setFilterQuery', payload);
    },
  },
  getters: {
    loading: (state) => {
      return state.loading;
    },
    error: (state) => {
      return state.error;
    },

    user: (state) => {
      return state.user;
    },
    isAuth: (state) => {
      return state.isAuth;
    },

    filterQuery: (state) => {
      return state.filterQuery;
    },
    filterQueryArray: (state) => {
      const currentKeys = state.filterQuery;
      const filterQueryArray = [];
      for (let key in currentKeys) {
        filterQueryArray.push(...currentKeys[key].keys);
      }
      return filterQueryArray;
    },

    filteredWdws: (state, getters) => {
      const isFiltered = (getters.filterQueryArray.length !== 0) ? true : false;
      if (!isFiltered) return state.wdws;


      let filteredWdws = [];
      const filteredWdwsId = [];
      const filterQueryArray = getters.filterQueryArray.map((v) => v.toLowerCase());

      if (state.filterStyle === 'AND') {
        filteredWdws = state.wdws.filter((value) => {
          const wdwsTags = value.tags.map((v) => v.toLowerCase());
          return filterQueryArray.every((tag) => {
            return wdwsTags.includes(tag.toLowerCase());
          })
        })
      } else {
        filteredWdws = state.wdws.filter((value) => {
          return value.tags.some((tag) => {
            if (filterQueryArray.includes(tag.toLowerCase()) && !filteredWdwsId.includes(value._id)) {
              filteredWdwsId.push(value._id);
              return true;
            }
          })
        })
      }
      return filteredWdws;
    },

    selectedWdw: (state) => (id) => {
      return state.wdws.find(wdw => wdw._id === id);
    },

    searchQuery: (state) => {
      return state.searchQuery;
    },
  },
});
