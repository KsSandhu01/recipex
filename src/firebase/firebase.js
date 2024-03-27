
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products tha t you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwL2Pxl_6quiohE_9ln09AMaKdWozqSxs",
  authDomain: "fir-b53ea.firebaseapp.com",
  databaseURL: "https://fir-b53ea-default-rtdb.firebaseio.com",
  projectId: "fir-b53ea",
  storageBucket: "fir-b53ea.appspot.com",
  messagingSenderId: "446246161582",
  appId: "1:446246161582:web:b2dfefbd265d5969ba313f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


