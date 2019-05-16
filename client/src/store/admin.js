import Ajax from './axios';

export default {
  state: {
    entities: [
      { _id: 'DE01', name: 'Entity Name', address: 'Entity Address', country: 'Country', phone: '+44-70-8888888' },
    ],
    tags: [
      { _id: 'DT01', name: 'Tag Name', group: 'Tag Group', label: 'Tag Label' },
    ],
    leads: [
      { _id: 'DL01', name: 'Toad', phone: '', email: 'toad@mail.com', user_id: 'asdf'},
      { _id: 'DL02', name: 'Mario', phone: '', email: 'mario@mail.com', user_id: 'qwer'},
      { _id: 'DL03', name: 'Luigi', phone: '', email: 'luigi@mail.com', user_id: 'jkly'},
      { _id: 'DL04', name: 'Peach', phone: '', email: 'peach@mail.com', user_id: 'uiop'},
      { _id: 'DL05', name: 'Bowser', phone: '', email: 'bowser@mail.com', user_id: 'jfkl'},
    ],
    units: [
      { _id: 'DU01', name: 'Red', branding: '#D3222A' },
      { _id: 'DU02', name: 'Blue', branding: '#00B0E8'},
      { _id: 'DU03', name: 'Grey', branding: '#5F6A72'},
      { _id: 'DU04', name: 'Green', branding: '#719500'},
    ],
    icons: [
      { _id: 'DI01', provider: 'Chat', mdi: 'chat' },
    ],
  },

  mutations: {
    setEntities (state, payload) {
      state.entities = payload;
    },
    setTags (state, payload) {
      state.tags = payload;
    },
    setLeads (state, payload) {
      state.leads = payload;
    },
    setUnits (state, payload) {
      state.units = payload;
    },
    setIcons (state, payload) {
      state.icons = payload;
    },
    pushMeta (state, payload) {
      if (/^D\w\d{2}$/.test(state[payload.target][0]._id)) state[payload.target].length = 0;
      state[payload.target].unshift(payload);
    },
    putMeta (state, payload) {
      const tags = state[`${ payload.target }`];
      for (let idx in tags) {
        if (tags[idx]._id === payload._id) {
          tags.splice(idx, 1, payload);
          break;
        }
      }
    },
    delMeta (state, payload) {
      const tags = state[`${ payload.target }`];
      for (let idx in tags) {
        if (tags[idx]._id === payload._id) {
          tags.splice(idx, 1);
          break;
        }
      }
    },
  },

  actions: {
    fetchDataSet ({ commit }) {
      commit('setLoading', true);
      Ajax.fetchDatas().then((response) => {
        if (response.icons.data.length) commit('setIcons', response.icons.data);
        if (response.units.data.length) commit('setUnits', response.units.data);
        if (response.leads.data.length) commit('setLeads', response.leads.data);
        if (response.entities.data.length) commit('setEntities', response.entities.data);
        if (response.tags.data.length) commit('setTags', response.tags.data);
        commit('setLoading', false);
      })
    },
    saveMeta ({ commit }, payload) {
      commit('setLoading', true);
      return Ajax.updateDatas(payload).then((response) => {
        commit('putMeta', { ...response.data, target: payload.target });
        commit('setLoading', false);
      });
    },
    createMeta ({ commit }, payload) {
      commit('setLoading', true);
      return Ajax.createDatas(payload).then((response) => {
        commit('pushMeta', { ...response.data, target: payload.target });
        commit('setLoading', false);
      });
    },
    removeMeta ({ commit }, payload) {
      commit('setLoading', true);
      return Ajax.removeDatas(payload).then((response) => {
        commit('delMeta', { ...response.data, target: payload.target });
        commit('setLoading', false);
      });
    },
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
    units: (state) => {
      return state.units;
    },
    tags: (state) => {
      return state.tags
        .sort((a, b) => (a.group < b.group) ? -1 : 1)
        .sort((a, b) => (a.label < b.label) ? -1 : 1);
    },
  }
}
