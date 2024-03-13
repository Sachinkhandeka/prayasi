// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "prayasi-blog.firebaseapp.com",
  projectId: "prayasi-blog",
  storageBucket: "prayasi-blog.appspot.com",
  messagingSenderId: "296272620447",
  appId: "1:296272620447:web:f10487d1cc4390ea0a6baa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
