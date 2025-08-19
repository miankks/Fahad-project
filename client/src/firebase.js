// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blacksky-mern.firebaseapp.com",
  projectId: "blacksky-mern",
  storageBucket: "blacksky-mern.firebasestorage.app",
  messagingSenderId: "800971425083",
  appId: "1:800971425083:web:8a253053372f8ead6b631e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);