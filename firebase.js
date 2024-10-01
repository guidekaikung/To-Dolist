// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA7HxHbKvUJuiOYM9rUJFFasESB9PypA8k",
  authDomain: "quicktaskmanager-89a59.firebaseapp.com",
  databaseURL: "https://quicktaskmanager-89a59-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quicktaskmanager-89a59",
  storageBucket: "quicktaskmanager-89a59.appspot.com",
  messagingSenderId: "641827670911",
  appId: "1:641827670911:web:09d925731123e9f3db684a",
  measurementId: "G-WMPQYQ3R78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
