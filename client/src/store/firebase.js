import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './firebase-config';

const setting = config[process.env.NODE_ENV];

const conf = {
  apiKey: setting.api_key,
  authDomain: setting.auth_domain,
  databaseURL: setting.database_url,
  projectId: setting.project_id,
  storageBucket: setting.storage_bucket,
  messagingSenderId: setting.messaging_sender_id
};

firebase.initializeApp(conf);

const fb = {};
fb.auth = firebase.auth();
fb.db = firebase.firestore();

export default fb;


// export default {
//   init() {
//     firebase.initializeApp(conf);
//     console.log('firebase.js, init()');
//     this.auth = firebase.auth();
//     // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//     this.db = firebase.firestore();
//   },
//   logout() {
//     firebase.auth().signOut().then(user => {
//       user = user ? user : {};
//       store.commit('setUser', user);
//       store.commit('setIsAuthenticated', user.uid ? true : false);
//     });
//   },
//   onAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//       user = user ? user : {};
//       console.log('firebase.js, onAuth');
//       store.commit('setUser', user);
//       store.commit('setIsAuthenticated', user.uid ? true : false);
//     })
//   }
// };
