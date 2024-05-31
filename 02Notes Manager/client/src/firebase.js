// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "mind-matrix.firebaseapp.com",
    projectId: "mind-matrix",
    storageBucket: "mind-matrix.appspot.com",
    messagingSenderId: "621331186896",
    appId: "1:621331186896:web:365dd0fe22d4d1d6180ad5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);