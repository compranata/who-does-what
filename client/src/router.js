import Vue from 'vue';
import Router from 'vue-router';
import firebase from '@/store/firebase';
import Dashboard from '@/views/Dashboard';
import Contacts from '@/views/Contacts';
import Login from '@/views/Login';

Vue.use(Router);

console.log('router.js after Vue.use(Router)');
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth.currentUser;
  console.log('router.js, ', currentUser);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});
// router.beforeEach((to, from, next) => {
//   const currentUser = fb.auth.currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !currentUser) next('about');
//   else if (!requiresAuth && currentUser) next();
//   else next();
// })

export default router;
