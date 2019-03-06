import Api from './api'

const endpoint = 'api/v1';

export default {
  fetchCards () {
    return Api().post(`${endpoint}/cards`)
  },

  createCard () {
    return Api().post(`${endpoint}/create`, params)
  },

  updateCard () {
    return Api().post(`${endpoint}/cards`, params)
  },

  removeCard () {
    return Api().post(`${endpoint}/cards`, params)
  }
};
