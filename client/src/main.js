import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import firebase from '@/store/firebase'

Vue.config.productionTip = false
// firebase.init();
// firebase.onAuth();

firebase.auth.onAuthStateChanged(user => {
  if (user) console.log(user);
  else console.log(null);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
