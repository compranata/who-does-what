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
        .then((user) => {
          user.user.updateProfile({ displayName: (payload.displayName) ? payload.displayName : payload.email })
            .then(() => {
              commit('setLoading', false);
              const newUser = {
                id: user.user.uid,
                displayName: user.user.displayName,
                email: user.user.email,
              };
              commit('setUser', newUser);
            })
            .catch((error) => {
              commit('setLoading', false);
              commit('setError', error);
            })
        })
        .catch((error) => {
            commit('setLoading', false);
            commit('setError', error);
          }
        );
      commit('setIsAuth', true);
      commit('setLoading', false);
    },
    signinUser ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false);
            const newUser = {
              id: user.user.uid,
              displayName: user.user.displayName,
              email: user.user.email
            }
            commit('setUser', newUser);
          }
        )
        .catch(
          error => {
            commit('setLoading', false);
            commit('setError', error);
          }
        );
      commit('setIsAuth', true);
      commit('setLoading', false);
    },
    autoSignin ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
      });
      commit('setIsAuth', true);
    },
    logout ({ commit }) {
      firebase.auth.signOut()
        .then(
          user => {
            user = user ? user : {};
            commit('setUser', user);
            commit('setIsAuth', user.uid ? true : false);
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
