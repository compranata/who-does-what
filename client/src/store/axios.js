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
    return api().post(`${endpoint}/wdws/update`, params);
  },
  removeWdw (params) {
    return api().post(`${endpoint}/wdws/remove`, params);
  },

  async fetchDatas () {
    const entities = await api().post(`${endpoint}/datas/entities`);
    const units = await api().post(`${endpoint}/datas/units`);
    const leads = await api().post(`${endpoint}/datas/leads`);
    const icons = await api().post(`${endpoint}/datas/icons`);
    const tags = await api().post(`${endpoint}/datas/tags`);

    return {
      entities: entities,
      units: units,
      leads: leads,
      icons: icons,
      tags: tags,
    };
  },

  createDatas (params) {
    return api().post(`${endpoint}/datas/create/${params.target}`, params);
  },

  updateDatas (params) {
    return api().post(`${endpoint}/datas/update/${params.target}`, params);
  },

  removeDatas (params) {
    return api().post(`${endpoint}/datas/remove/${params.target}`, params);
  },
};
