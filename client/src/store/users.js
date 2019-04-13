import firebase from './firebase';

export default {
  state: {
    user: null,
    isAuth: false,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    setIsAuth (state, payload) {
      state.isAuth = payload;
    },
  },
  actions: {
    signupUser ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((cred) => {
        return cred.user.updateProfile({ displayName: (payload.displayName) ? payload.displayName : payload.email })
          .then(() => {
            commit('setLoading', false);
            commit('setUser', {
              id: cred.user.uid,
              displayName: cred.user.displayName,
              email: cred.user.email,
            });
            return cred;
          })
          .catch((error) => {
            commit('setLoading', false);
            commit('setError', error);
            return cred;
          });
      })
      .catch((error) => {
        commit('setLoading', false);
        commit('setError', error);
      });
    },

    signinUser ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((cred) => {
          commit('setLoading', false);
          commit('setUser', {
            id: cred.user.uid,
            displayName: cred.user.displayName,
            email: cred.user.email
          });
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
        });
    },

    autoSignin ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        displayName: payload.displayName ? payload.displayName : 'Error',
      });
      commit('setIsAuth', true);
    },
    
    signout ({ commit }, payload) {
      firebase.auth.signOut()
        .then(
          user => {
            user = user ? user : {};
            commit('setUser', user);
            commit('setIsAuth', user.uid ? true : false);
            payload.router.push({ name: 'home', params: { user }});
          }
        );
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    isAuth: (state) => {
      return state.isAuth;
    },
  },
}
