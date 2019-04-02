import Vue from 'vue';
import Vuex from 'vuex';

import wdws from './wdws';
import users from './users';
import shared from './shared';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    wdws: wdws,
    users: users,
    shared: shared,
  }
});
