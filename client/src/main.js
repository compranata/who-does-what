import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import DateFilter from './filters/date';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('autoSignin', { uid: '1234', email: 'compra@nata.es', name: 'CompraNata' });
    this.$store.dispatch('fetchWdws');
  },
}).$mount('#app');
