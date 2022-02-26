// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "m-fawzaan.firebaseapp.com",
  projectId: "m-fawzaan",
  storageBucket: "m-fawzaan.appspot.com",
  messagingSenderId: "926994513119",
  appId: process.env.FIREBASE_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
