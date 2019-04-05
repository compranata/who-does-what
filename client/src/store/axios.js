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
    const icons = await api().post(`${endpoint}/datas/icons`);
    const units = await api().post(`${endpoint}/datas/units`);
    const entities = await api().post(`${endpoint}/datas/entity`);
    const tags = await api().post(`${endpoint}/datas/entity`);

    const datas = {
      icons: icons,
      units: units,
      entities: entities,
      tags: tags,
    };

    return datas;
  },
};
