import firebase from './firebase';
import Ajax from './axios';

export default {
  state: {
    wdws: [],

    defaultImage: 'https://firebasestorage.googleapis.com/v0/b/web-auth-1c43f.appspot.com/o/wdws%2FdefaultWdw.jpg?alt=media&token=9b2ff955-dbb6-4456-8508-59c494938b92',
    keywords: '',

    isForm: false,
    isFiltered: false,
    filterStyle: 'AND',
    filterQuery: [],

    sorting: '',

    isSelectedTags: [],

    searchQuery: [],

  },
  mutations: {
    setKeywords (state, payload) {
      state.keywords = payload;
    },

    setIsForm (state, payload) {
      state.isForm = payload;
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
      state.wdws.unshift(payload);
    },

  },
  actions: {
    setKeywords ({ commit }, payload) {
      commit('setKeywords', payload);
    },

    setIsForm ({ commit }, payload) {
      commit('setIsForm', payload);
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

    fetchWdws ({ commit }) {
      commit('setLoading', true);
      Ajax.fetchWdws().then((response) => {
        commit('setWdws', response.data);
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
      const ajaxUpsert = () => {
        if (payload.isEditing && payload._id) {
          return Ajax.updateWdw({ _id: payload._id, query: wdw })
        } else {
          return Ajax.createWdw(wdw)
        }
      }
      ajaxUpsert()
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
        .then((result) => {
          result.data.entity = wdw.entity;
          result.data.unit = wdw.unit;
          commit('setLoading', false);
          if (payload.isEditing) {
            commit('putWdw', result.data);
          } else {
            commit('pushWdw', result.data);
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
          if (result.data.publish) {
            commit('setLoading', false);
            commit('setError', result.data);
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
    defaultImage: (state) => {
      return state.defaultImage;
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

    isForm: (state) => {
      return state.isForm;
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
