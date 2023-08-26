// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0xyr-wrnZoVKDAnoQUm3XXaVKVaAzTpM",
  authDomain: "relationship-app-5a23f.firebaseapp.com",
  projectId: "relationship-app-5a23f",
  storageBucket: "relationship-app-5a23f.appspot.com",
  messagingSenderId: "216363672395",
  appId: "1:216363672395:web:112a20f8e052cbefab7ece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };