// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwMkvvMp8aXKV7r331hYtABnrIG1NYOEs",
  authDomain: "hotelmenu-b15e7.firebaseapp.com",
  projectId: "hotelmenu-b15e7",
  storageBucket: "hotelmenu-b15e7.appspot.com",
  messagingSenderId: "89789342571",
  appId: "1:89789342571:web:ffe24228f90a150477622e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



