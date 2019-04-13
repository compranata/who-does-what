import Vue from 'vue';
import Vuex from 'vuex';

import wdws from './wdws';
import users from './users';
import shared from './shared';
import admin from './admin';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    admin: admin,
    wdws: wdws,
    users: users,
    shared: shared,
  }
});
