// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';

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
const app = initializeApp(firebaseConfig);

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

export const Firebase = {
  emailSignIn,
  checkSignIn,
  auth,
};
