// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0NBqTg8ozAX6cpVjvDjKzxeQbyI_l-rU',
  authDomain: 'yonsei-med-test.firebaseapp.com',
  databaseURL: 'https://yonsei-med-test-default-rtdb.firebaseio.com',
  projectId: 'yonsei-med-test',
  storageBucket: 'yonsei-med-test.appspot.com',
  messagingSenderId: '1053130813392',
  appId: '1:1053130813392:web:579b870aca1846e00153d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const actionCodeSettings = {
  url: 'https://yonsei-med-test.firebaseapp.com/auth',
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

export const Firebase = {
  emailSignIn,
  auth,
};
