// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ap-tech-center.firebaseapp.com",
  projectId: "ap-tech-center",
  storageBucket: "ap-tech-center.appspot.com",
  messagingSenderId: "528863210486",
  appId: "1:528863210486:web:b2d534d9ba01a83d3975d7",
  measurementId: "G-N4QDLJ7X7J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
