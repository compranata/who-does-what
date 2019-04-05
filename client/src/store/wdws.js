import firebase from './firebase';
import Ajax from './axios';

export default {
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
      { _id: 't01o', name: 'Toad', phone: '', email: 'toad@mail.com', user_id: 'asdf'},
      { _id: 'm02o', name: 'Mario', phone: '', email: 'mario@mail.com', user_id: 'qwer'},
      { _id: 'l03i', name: 'Luigi', phone: '', email: 'luigi@mail.com', user_id: 'jkly'},
      { _id: 'p04h', name: 'Peach', phone: '', email: 'peach@mail.com', user_id: 'uiop'},
      { _id: 'b05r', name: 'Bowser', phone: '', email: 'bowser@mail.com', user_id: 'jfkl'},
    ],
    units: [
      { _id: 'fire', name: 'Fire', branding: '#D3222A' },
      { _id: 'water', name: 'Water', branding: '#00B0E8'},
      { _id: 'air', name: 'Air', branding: '#5F6A72'},
      { _id: 'earth', name: 'Earth', branding: '#719500'},
    ],
    icons: [
      { _id: 'chat', provider: 'Chat', mdi: 'chat' },
      { _id: 'what', provider: 'WhatsApp', mdi: 'mdi-whatsapp' },
      { _id: 'face', provider: 'Facebook', mdi: 'mdi-facebook-messenger' },
      { _id: 'wech', provider: 'WeChat', mdi: 'mdi-wechat' },
      { _id: 'hang', provider: 'Hangouts', mdi: 'mdi-google-hangouts' },
      { _id: 'skyp', provider: 'Skype', mdi: 'mdi-skype' },
    ],

    defaultImage: 'https://firebasestorage.googleapis.com/v0/b/web-auth-1c43f.appspot.com/o/wdws%2FdefaultWdw.jpg?alt=media&token=9b2ff955-dbb6-4456-8508-59c494938b92',
    keywords: '',

    isFiltered: false,
    filterStyle: 'AND',
    filterQuery: [],

    sorting: '',

    countTags: [],
    isSelectedTags: [],

    searchQuery: [],

  },
  mutations: {
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
    setWdws (state, payload) {
      state.wdws = payload;
    },
    putWdw (state, payload) {
      const wdws = state.wdws;
      for (let idx in wdws) {
        if (wdws[idx]._id === payload._id) {
          wdws.splice(idx, 1, payload);
          break;
        }
      }
    },
    removeWdw (state, payload) {
      const wdws = state.wdws;
      for (let idx in wdws) {
        if (wdws[idx]._id === payload._id) {
          wdws.splice(idx, 1);
          break;
        }
      }
    },
    pushWdw (state, payload) {
      state.wdws.push(payload);
    },

  },
  actions: {
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
          commit('removeFilterQuery', currentKeys[key]);
        }
      }
      commit('setFilterQuery', payload);
      commit('setIsFiltered', (this.getters.filterQueryArray.length < 1) ? false : true);
      commit('setIsSelectedTags', (payload.keys.length !== 0) ? payload.label : '');
    },
    toggleSorting ({ commit }, payload) {
      commit('setSorting', payload);
    },

    fetchDataSet ({ commit }) {

    },
    fetchWdws ({ commit }) {
      commit('setLoading', true);
      Ajax.fetchWdws().then((response) => {
        commit('setWdws', response.data)
        commit('setLoading', false);
      });
    },
    saveWdw ({ commit, getters }, payload) {
      commit('setLoading', true);
      const wdw = {
        name: payload.name,
        description: payload.description,
        unit: (getters.units.filter((u) => u.name === payload.unit))[0],
        entity: (getters.entities.filter((e) => e._id == payload.entity))[0],
        lead: (getters.leads.filter((l) => l._id === payload.lead))[0],
        phone: payload.phone,
        fax: payload.fax,
        email: payload.email,
        sip: { ...payload.sipProvider, account: payload.sipAccount },
        remark: payload.remark,
        tags: payload.tags,
        creatorId: getters.user.id,
      };

      const router = payload.router;
      let imageUrl;
      let key;
      const promise = () => {
        if (payload.isEditing && payload._id) {
          return Ajax.updateWdw({ _id: payload._id, query: wdw })
        } else {
          return Ajax.createWdw(wdw)
        }
      }
      promise()
        .then((result) => {
          key = result.data._id;
          return key;
        })
        .then((key) => {
          if (payload.image) {
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'));
            return firebase.storage.ref('wdws/' + key + ext).put(payload.image);
          } else if (payload.isEditing) {
            let fileUrl = payload.imageUrl.slice(payload.imageUrl.lastIndexOf('/'), payload.imageUrl.lastIndexOf('?')).replace('%2F', '/');
            return firebase.storage.ref(fileUrl);
          } else {
            return firebase.storage.ref('wdws/defaultWdw.jpg');
          }
        })
        .then((fileData) => {
          const ref = (fileData.ref) ? fileData.ref : fileData;
          return ref.getDownloadURL().then((downloadURL) => {
            imageUrl = downloadURL;
            return Ajax.updateWdw({ _id: key, query: { $set: { imageUrl: imageUrl } } });
          });
        })
        .then((wdw) => {
          commit('setLoading', false);
          if (payload.isEditing) {
            commit('putWdw', wdw.data);
          } else {
            commit('pushWdw', wdw.data);
          }
          const user = getters.user;
          router.push({ name: 'home', params: user });
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
        })
    },
    deleteWdw ({ commit }, payload) {
      if (!payload._id) commit('setError', new Error('Something went wrong!'));
      commit('setLoading', true);
      const router = payload.router;
      Ajax.removeWdw({ _id: payload._id })
        .then((result) => {
          if (!result.data.ok) {
            commit('setError', new Error('Something went wrong!'));
            return;
          }
          commit('setLoading', false);
          commit('removeWdw', { _id: payload._id });
          router.push({ name: 'home' });
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
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
    units: (state) => {
      return state.units;
    },

    defaultImage: (state) => {
      return state.defaultImage;
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
      switch (state.sorting) {
        case 'Lead':
        case 'Unit':
        case 'Entity':
          filteredWdws.sort((a, b) => a[state.sorting.toLowerCase()].name < b[state.sorting.toLowerCase()].name ? -1 : 1)
          break;
        default:
          filteredWdws.sort((a, b) => a[state.sorting.toLowerCase()] < b[state.sorting.toLowerCase()] ? -1 : 1)
      }
      return filteredWdws;
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
}
