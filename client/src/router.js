import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Signin from '@/views/Signin';
import WdW from '@/views/WhoDoesWhat';
import Search from '@/views/Search';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/wdw',
      name: 'wdw',
      component: WdW
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
  ],
});

export default router;
