import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import firebase from '@/store/firebase';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertPop from '@/components/Shared/AlertPop';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertPop);



new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.init();
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('onAuth: true');
        this.$store.dispatch('autoSignin', user);
        this.$store.dispatch('fetchWdws');
      } else {
        console.log('onAuth: false')
        this.$store.commit('setUser', null);
        this.$store.commit('setWdws', []);
      }
    })
  },
}).$mount('#app');
