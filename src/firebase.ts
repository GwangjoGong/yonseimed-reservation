// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

import { Item } from './pages';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeQcWBJtOpxjNz4-HvdDUieipPT-H-ICo',
  authDomain: 'yonseimed-reservation.firebaseapp.com',
  projectId: 'yonseimed-reservation',
  storageBucket: 'yonseimed-reservation.appspot.com',
  messagingSenderId: '754687727915',
  appId: '1:754687727915:web:9f5d6e36f35debed654d6e',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const actionCodeSettings = {
  url: 'http://localhost:3000/auth',
  handleCodeInApp: true,
};

const auth = getAuth();

const emailSignIn = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  } catch {
    window.alert('로그인에 실패했습니다. 관리자에게 문의해주세요.');
  }
};

const checkSignIn = async () => {
  const email = window.localStorage.getItem('emailForSignIn');
  window.localStorage.removeItem('emailForSignIn');

  if (email) {
    try {
      const res = await signInWithEmailLink(auth, email);

      if (res.user) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  return false;
};

const logout = async () => {
  await auth.signOut();
};

const db = getFirestore();

const getItems = async () => {
  const snapshot = await getDocs(collection(db, 'items'));

  return snapshot.docs.map((docs) => ({
    id: docs.id,
    data: docs.data(),
  }));
};

const getItem = async (id: string) => {
  const docRef = doc(db, 'items', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

const updateItem = async (id: string, data: any) => {
  const docRef = doc(db, 'items', id);

  await updateDoc(docRef, data);
};

const makeMalfunctionReport = async (
  item: Item,
  reported_at: string,
  reported_by: string,
) => {
  await addDoc(collection(db, 'report_malfunction'), {
    item,
    reported_at,
    reported_by,
  });
};

const makeLostReport = async (item: Item, lost_at: string, lost_by: string) => {
  await addDoc(collection(db, 'report_lost'), {
    item,
    lost_at,
    lost_by,
  });
};

export const Firebase = {
  emailSignIn,
  checkSignIn,
  auth,
  logout,
  getItems,
  getItem,
  updateItem,
  makeMalfunctionReport,
  makeLostReport,
};
