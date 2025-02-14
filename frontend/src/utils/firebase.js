// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEkwsmPHBDUDKQWn_F0mI5d6UxnGdMuu8",
  authDomain: "e-commerce-88813.firebaseapp.com",
  projectId: "e-commerce-88813",
  storageBucket: "e-commerce-88813.firebasestorage.app",
  messagingSenderId: "604618960086",
  appId: "1:604618960086:web:ef2274408b63108c72ad77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);