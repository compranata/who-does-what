import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/components/User/Signin';
import WdW from '@/components/WDW/WhoDoesWhat';
import FormWDW from '@/components/WDW/FormWDW';
import TestLayout from '@/components/WDW/TestLayout';
import Admin from '@/components/Admin/Console.vue';
import AuthGuard from './auth-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: WdW,
      alias: '/wdw',
      beforeEnter: AuthGuard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/wdw/new',
      name: 'createWdW',
      component: FormWDW,
      beforeEnter: AuthGuard,
    },
    {
      path: '/wdw/edit/:id',
      name: 'editWdW',
      props: true,
      component: FormWDW,
      beforeEnter: AuthGuard,
    },
    {
      path: '/test',
      name: 'testLayout',
      component: TestLayout
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: AuthGuard,
    },
  ],
});

export default router;
