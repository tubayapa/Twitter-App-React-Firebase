// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3kw50gxDDZzZzqJOEgynAm8m_VDhY8yQ",
  authDomain: "twitter-clone-ef236.firebaseapp.com",
  projectId: "twitter-clone-ef236",
  storageBucket: "twitter-clone-ef236.appspot.com",
  messagingSenderId: "72979187595",
  appId: "1:72979187595:web:d8c2ea241e907a0645d18e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth referans alma
export const auth = getAuth(app);

// google  saglayicisini kurma
export const provider = new GoogleAuthProvider();

// firebase firestore referans alma
export const db = getFirestore(app);

// firebase storage referans alma
export const storage = getStorage(app);
