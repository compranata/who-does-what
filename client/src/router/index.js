import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/components/User/Signin';
import WdW from '@/components/WDW/WhoDoesWhat';
import CreateWdW from '@/components/WDW/CreateWDW';
import TestLayout from '@/components/WDW/TestLayout';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: WdW
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
      path: '/wdw/new',
      name: 'createWdW',
      component: CreateWdW
    },
    {
      path: '/test',
      name: 'testLayout',
      component: TestLayout
    },
  ],
});

export default router;
