import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import firebase from '@/store/firebase';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertPop from '@/components/Shared/AlertPop';
import InfoPop from '@/components/Shared/InfoPop';
import Profile from '@/components/User/Profile';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertPop);
Vue.component('app-info', InfoPop);
Vue.component('user-profile', Profile);


new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.init();
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user);
        this.$store.dispatch('fetchDataSet');
        this.$store.dispatch('fetchWdws');
      } else {
        this.$store.commit('setUser', null);
        this.$store.commit('setWdws', []);
      }
    })
  },
}).$mount('#app');
