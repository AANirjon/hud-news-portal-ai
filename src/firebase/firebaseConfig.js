// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAsINNGC8l5_RbzIXGBkQpBHozCNpRgyvw",
    authDomain: "appendin-5e313.firebaseapp.com",
    projectId: "appendin-5e313",
    storageBucket: "appendin-5e313.firebasestorage.app",
    messagingSenderId: "536969147682",
    appId: "1:536969147682:web:48e3bc2a13cfb0905c617b",
    measurementId: "G-5H17FLNE53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
