import api from './api';

const endpoint = '/api/v2';

export default {
  fetchWdws () {
    return api().post(`${endpoint}/wdws`);
  },

  createWdw (params) {
    return api().post(`${endpoint}/wdws/create`, params);
  },

  updateWdw (params) {
    return api().post(`${endpoint}/wdws`, params);
  },

  removeWdw (params) {
    return api().post(`${endpoint}/wdws`, params);
  }
};
