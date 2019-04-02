import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import fbKeys from './firebase-config';

const setting = fbKeys[process.env.NODE_ENV];
const config = {
  apiKey: setting.api_key,
  authDomain: setting.auth_domain,
  databaseURL: setting.database_url,
  projectId: setting.project_id,
  storageBucket: setting.storage_bucket,
};


export default {
  init() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
};
