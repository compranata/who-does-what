import { store } from '@/store';

export default (to, from, next) => {
  if (store.getters.user) {
    console.log('authGuard: ', store.getters.user);
    next();
  } else {
    console.log('redirect: ', store.getters.user);
    next('/signin');
  }
}
