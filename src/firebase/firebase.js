
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDNI6H7npK3HkkWsWmXItrR6UvXaxiNXAM",
  authDomain: "food-80454.firebaseapp.com",
  databaseURL: "https://fir-b53ea-default-rtdb.firebaseio.com",
  projectId: "food-80454",
  storageBucket: "food-80454.appspot.com",
  messagingSenderId: "16548063172",
  appId: "1:16548063172:web:d239258893e1d66efc2691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


