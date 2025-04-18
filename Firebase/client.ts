
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD9l4SdBp6eBOLIcM__mprwpSWAqg_Z5gY",
  authDomain: "prepwise-35cb9.firebaseapp.com",
  projectId: "prepwise-35cb9",
  storageBucket: "prepwise-35cb9.firebasestorage.app",
  messagingSenderId: "454214833002",
  appId: "1:454214833002:web:bbfa810c7786ddc29e4b13",
  measurementId: "G-99K7Q4TCGZ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);