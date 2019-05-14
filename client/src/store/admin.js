import Ajax from './axios';

export default {
  state: {
    entities: [
      { _id: 'DE01', name: 'Berlin Office', address: 'Friedrichstr. 123, 10211 Berlin', country: 'Germany', phone: '+49-30-12345566' },
      { _id: 'DE02', name: 'Frankfurt Office', address: 'Rossmarkt. 6, 60311 Frankfurt', country: 'Germany', phone: '+49-69-3432938' },
      { _id: 'DE03', name: 'London Office', address: 'Goswell Road, London', country: 'United Kingdam', phone: '+44-110202012' },
      { _id: 'DE04', name: 'Barcelona Office', address: 'Calle de Francisco. 123, Barcelona', country: 'Spain', phone: '+36-30-12345566' },
      { _id: 'DE05', name: 'Paris Office', address: 'Rue prima. 6, Paris', country: 'France', phone: '+39-69-3432938' },
      { _id: 'DE06', name: 'Milano Office', address: 'Milano', country: 'Italy', phone: '+42-110202012' },
    ],
    tags: [
      { _id: 'DT01', name: 'Germany', group: 'C.Europe', label: 'Destinations' },
      { _id: 'DT02', name: 'Portugal', group: 'S.Europe', label: 'Destinations' },
      { _id: 'DT03', name: 'France', group: 'W.Europe', label: 'Destinations' },
      { _id: 'DT04', name: 'Sales Operations', group: 'Outbound', label: 'Functions' },
      { _id: 'DT05', name: 'Japanese', group: '', label: 'Markets' },
      { _id: 'DT06', name: 'United Kingdam', group: 'N.Europe', label: 'Destinations' },
      { _id: 'DT07', name: 'Spain', group: 'S.Europe', label: 'Destinations' },
      { _id: 'DT08', name: 'Events', group: 'Incentives', label: 'Business' },
      { _id: 'DT09', name: 'Customer Care', group: 'Inbound', label: 'Functions' },
      { _id: 'DT10', name: 'Chinese', group: '', label: 'Markets' },
      { _id: 'DT11', name: 'American', group: '', label: 'Markets' },
      { _id: 'DT12', name: 'Service Operations', group: 'Inbound', label: 'Functions' },
    ],
    leads: [
      { _id: 'DL01', name: 'Toad', phone: '', email: 'toad@mail.com', user_id: 'asdf'},
      { _id: 'DL02', name: 'Mario', phone: '', email: 'mario@mail.com', user_id: 'qwer'},
      { _id: 'DL03', name: 'Luigi', phone: '', email: 'luigi@mail.com', user_id: 'jkly'},
      { _id: 'DL04', name: 'Peach', phone: '', email: 'peach@mail.com', user_id: 'uiop'},
      { _id: 'DL05', name: 'Bowser', phone: '', email: 'bowser@mail.com', user_id: 'jfkl'},
    ],
    units: [
      { _id: 'DU01', name: 'Fire', branding: '#D3222A' },
      { _id: 'DU02', name: 'Water', branding: '#00B0E8'},
      { _id: 'DU03', name: 'Air', branding: '#5F6A72'},
      { _id: 'DU04', name: 'Earth', branding: '#719500'},
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
      // return new Promise((resolve, reject) => {
      //   setTimeout((err) => {
      //     if (err) reject();
      //     commit('putMeta', payload);
      //     commit('setLoading', false);
      //     resolve();
      //   }, 2000)
      // })
    },
    createMeta ({ commit }, payload) {
      commit('setLoading', true);
      return Ajax.createDatas(payload).then((response) => {
        commit('pushMeta', { ...response.data, target: payload.target });
        commit('setLoading', false);
      });
      // return new Promise((resolve, reject) => {
      //   setTimeout((err) => {
      //     if (err) reject();
      //     commit('pushMeta', payload);
      //     commit('setLoading', false);
      //     resolve();
      //   }, 2000)
      // })
    },
    removeMeta ({ commit }, payload) {
      commit('setLoading', true);
      return Ajax.removeDatas(payload).then((response) => {
        console.log(response);
        commit('delMeta', response.data);
        commit('setLoading', false);
      });
      // return new Promise((resolve, reject) => {
      //   setTimeout((err) => {
      //     if (err) reject();
      //     commit('delMeta', payload);
      //     commit('setLoading', false);
      //     resolve();
      //   }, 1000)
      // })
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
