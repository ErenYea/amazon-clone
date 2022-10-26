// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB6bFrtUKm7Ovbrl4EromfXTf4GjpWGkGU",
  authDomain: "clone-d4f05.firebaseapp.com",
  projectId: "clone-d4f05",
  storageBucket: "clone-d4f05.appspot.com",
  messagingSenderId: "375141399023",
  appId: "1:375141399023:web:6c7c789340b36504a81e1a",
  measurementId: "G-XML8WNEYHE",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
};
