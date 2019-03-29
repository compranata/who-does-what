import Vue from 'vue';
import Vuex from 'vuex';
import Ajax from './axios';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    wdws: [],
    entities: [
      { _id: '001', name: 'Berlin Office', address: 'Friedrichstr. 123, 10211 Berlin', country: 'Germany', phone: '+49-30-12345566' },
      { _id: '002', name: 'Frankfurt Office', address: 'Rossmarkt. 6, 60311 Frankfurt', country: 'Germany', phone: '+49-69-3432938' },
      { _id: '003', name: 'London Office', address: 'Goswell Road, London', country: 'United Kingdam', phone: '+44-110202012' },
      { _id: '004', name: 'Barcelona Office', address: 'Calle de Francisco. 123, Barcelona', country: 'Spain', phone: '+36-30-12345566' },
      { _id: '005', name: 'Paris Office', address: 'Rue prima. 6, Paris', country: 'France', phone: '+39-69-3432938' },
      { _id: '006', name: 'Milano Office', address: 'Milano', country: 'Italy', phone: '+42-110202012' },
    ],
    tags: [
      { _id: '001x', name: 'Germany', group: 'C.Europe', label: 'Destinations' },
      { _id: '005x', name: 'Portugal', group: 'S.Europe', label: 'Destinations' },
      { _id: '002x', name: 'France', group: 'W.Europe', label: 'Destinations' },
      { _id: '009x', name: 'Sales Operations', group: 'Outbound', label: 'Functions' },
      { _id: '010x', name: 'Japanese', group: '', label: 'Markets' },
      { _id: '003x', name: 'United Kingdam', group: 'N.Europe', label: 'Destinations' },
      { _id: '004x', name: 'Spain', group: 'S.Europe', label: 'Destinations' },
      { _id: '006r', name: 'Events', group: 'Incentives', label: 'Business' },
      { _id: '007r', name: 'Customer Care', group: 'Inbound', label: 'Functions' },
      { _id: '011t', name: 'Chinese', group: '', label: 'Markets' },
      { _id: '012t', name: 'American', group: '', label: 'Markets' },
      { _id: '008y', name: 'Service Operations', group: 'Inbound', label: 'Functions' },
    ],
    leads: [
      { _id: '100', name: 'Toad', phone: '', mail: 'john@mail.com', user_id: 'asdf'},
      { _id: '200', name: 'Mario', phone: '', mail: 'mike@mail.com', user_id: 'qwer'},
      { _id: '300', name: 'Luigi', phone: '', mail: 'mia@mail.com', user_id: 'jkly'},
      { _id: '400', name: 'Peach', phone: '', mail: 'maria@mail.com', user_id: 'uiop'},
    ],
    units: [
      { name: 'Fire', branding: '#D3222A' },
      { name: 'Water', branding: '#00B0E8'},
      { name: 'Air', branding: '#5F6A72'},
      { name: 'Earth', branding: '#719500'},
    ],
    icons: [
      { provider: 'Chat', mdi: 'chat' },
      { provider: 'Facebook', mdi: 'mdi-facebook-messenger' },
      { provider: 'WhatsApp', mdi: 'mdi-whatsapp' },
      { provider: 'WeChat', mdi: 'mdi-wechat' },
      { provider: 'Hangouts', mdi: 'mdi-google-hangouts' },
      { provider: 'Skype', mdi: 'mdi-skype' },
    ],

    loading: false,
    error: null,

    user: null,
    isAuth: false,

    keywords: '',

    isFiltered: false,
    filterStyle: 'AND',
    filterQuery: [],

    sorting: 'name',

    countTags: [],
    isSelectedTags: [],

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

    setKeywords (state, payload) {
      state.keywords = payload;
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
    setIsFiltered (state, payload) {
      state.isFiltered = payload;
    },
    setIsSelectedTags (state, payload) {
      if (payload !== '') {
        state.isSelectedTags.push(payload);
      }
    },
    removeIsSelectedTags (state, payload) {
      state.isSelectedTags.splice(state.isSelectedTags.indexOf(payload), 1);
    },
    // removeFilter (state) {
    //   state.filterQuery.length = 0;
    //   state.isFiltered = false;
    // },

    setSorting (state, payload) {
      state.sorting = payload;
    },

    setWdws (state, payload) {
      state.wdws = payload;
    },
    saveWdw (state, payload) {
      state.wdws.push(payload);
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
        name: payload.name,
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
          name: payload.name,
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
        name: payload.name,
        displayName: payload.displayName,
      });
      commit('setIsAuth', true);
    },

    setKeywords ({ commit }, payload) {
      commit('setKeywords', payload);
    },

    toggleFilterStyle ({ commit }, payload) {
      commit('setFilterStyle', payload);
    },
    pushFilterQuery({ commit }, payload) {
      const currentKeys = this.getters.filterQuery;
      for (let key in currentKeys) {
        if (currentKeys[key].label === payload.label && currentKeys[key].group === payload.group) {
          commit('removeIsSelectedTags', currentKeys[key].label);
          // commit('decrementCountTags', { label: currentKeys[key].label, count: currentKeys[key].keys.length });
          commit('removeFilterQuery', currentKeys[key]);
        }
      }
      commit('setFilterQuery', payload);
      commit('setIsFiltered', (this.getters.filterQueryArray.length < 1) ? false : true);
      commit('setIsSelectedTags', (payload.keys.length !== 0) ? payload.label : '');
      // commit('incrementCountTags', { label: payload.label, count: parseInt(payload.keys.length) });
    },
    toggleSorting ({ commit }, payload) {
      commit('setSorting', payload);
    },

    fetchWdws ({ commit }) {
      Ajax.fetchWdws().then((response) => {
        commit('setWdws', response.data)
      });
    },
    saveWdw ({ commit }, payload) {
      const wdw = {
        url: payload.url,
        name: payload.name,
        description: payload.description,
        phone: payload.phone,
        fax: payload.fax,
        email: payload.email,
        sip: { ...(this.state.icons[payload.sipicon]), account: payload.sip },
        sipicon: payload.sipicon,
        remark: payload.remark,
        entity: (this.state.entities.filter((e) => e._id == payload.entity))[0],
        lead: (this.state.leads.filter((l) => l._id === payload.lead))[0],
        tags: payload.tags,
        unit: (this.state.units.filter((u) => u.name === payload.unit))[0],
      };
      Ajax.createWdw(wdw).then((response) => {
        commit('saveWdw', response);
      })
    },
    // removeFilter ({ commit}) {
    //   function removeClass (elements) {
    //     Array.from(elements).forEach((element) => {
    //       element.classList.remove('v-btn--active', 'v-btn-toggle--selected', 'v-btn-toggle--only-child');
    //     })
    //   }
    //   removeClass(document.getElementsByClassName('v-btn--active'));
    //   removeClass(document.getElementsByClassName('v-btn-toggle--selected'));
    //
    //
    //   commit('removeFilter');
    // },
  },
  getters: {
    icons: (state) => {
      return state.icons;
    },
    entities: (state) => {
      return state.entities;
    },
    leads: (state) => {
      return state.leads;
    },
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

    units: (state) => {
      return state.units;
    },

    tags: (state) => {
      return state.tags
        .sort((a, b) => (a.group < b.group) ? -1 : 1)
        .sort((a, b) => (a.label < b.label) ? -1 : 1);
    },
    tagSelections: (state, getters) => {
      const sortedTags = getters.tags;
      const tagSelections = [];
      const tagLabels = [];
      sortedTags.forEach((tag) => {
        if (!tagLabels.includes(tag.label)) {
          if (tagLabels.length > 0) tagSelections.push({ divider: true });
          tagLabels.push(tag.label);
          tagSelections.push({ header: tag.label });
        }
        tagSelections.push({
          _id: tag._id,
          name: tag.name,
          group: tag.group,
          label: tag.label,
          avatar: tag.label.slice(0,1),
        });
      });
      return tagSelections;
    },

    keywords: (state) => {
      return state.keywords;
    },

    isFiltered: (state) => {
      return state.isFiltered;
    },
    filterStyle: (state) => {
      return state.filterStyle;
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

    sorting: (state) => {
      return state.sorting;
    },

    isSelectedTags: (state) => (label) => {
      return state.isSelectedTags.includes(label);
    },

    filteredWdws: (state, getters) => {
      if (state.sorting === '') state.sorting = '_id';
      let filteredWdws = getters.filteringWdws;
      if (state.keywords !== '' && state.keywords !== null) {
        filteredWdws = filteredWdws.filter((value) => {
          return JSON.stringify(value).toLowerCase().includes(state.keywords.toLowerCase());
        })
      }
      return filteredWdws.sort((a, b) => a[state.sorting] < b[state.sorting] ? -1 : 1);
    },

    filteringWdws: (state, getters) => {
      let filteredWdws = [];
      const filteredWdwsId = [];
      const filterQueryArray = getters.filterQueryArray;

      if (!getters.isFiltered) {
        filteredWdws = state.wdws;
      } else if (state.filterStyle === 'AND') {
        filteredWdws = state.wdws.filter((value) => {
          return filterQueryArray.every((tag) => {
            return value.tags.includes(tag);
          })
        })
      } else {
        filteredWdws = state.wdws.filter((value) => {
          return value.tags.split(',').some((tag) => {
            if (filterQueryArray.includes(tag) && !filteredWdwsId.includes(value._id)) {
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
