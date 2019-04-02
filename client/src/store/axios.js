import api from './api';

const endpoint = '/api/v2';

export default {
  fetchWdws () {
    return api().post(`${endpoint}/wdws`);
  },

  createWdw (params) {
    return api().post(`${endpoint}/wdws/create`, params);
  },

  updateImageWdw (params) {
    return api().post(`${endpoint}/wdws/imgupdate`, params);
  },

  removeWdw (params) {
    return api().post(`${endpoint}/wdws/remove`, params);
  }
};
