// utils/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBdZc2hnPDaxvIPYJVDP1qlft2Y0zTuF3I',
  authDomain: 'packswap-11dea.firebaseapp.com',
  projectId: 'packswap-11dea',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
