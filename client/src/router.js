import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Signin from '@/components/User/Signin';
import WdW from '@/components/WDW/WhoDoesWhat';
import Search from '@/components/WDW/Search';

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
