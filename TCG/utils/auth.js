// utils/auth.js
import { auth } from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

export async function registerUser(email, password) {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;

    //Save username to Firestore under users/{uid}
    await setDoc(doc(db, 'users', user.uid), {
    email,
    username,
    createdAt: new Date(),
  });

  return user;
}

export async function loginUser(email, password) {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential.user;
}

export async function getIdToken() {
  const user = auth.currentUser;
  return user ? user.getIdToken() : null;
}
