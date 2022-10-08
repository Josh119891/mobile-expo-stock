import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries
// @ts-ignore
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '@env';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = firebase.firestore();
export const auth = getAuth(app);
