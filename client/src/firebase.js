import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ap-tech-center.firebaseapp.com",
  projectId: "ap-tech-center",
  storageBucket: "ap-tech-center.appspot.com",
  messagingSenderId: "528863210486",
  appId: "1:528863210486:web:b2d534d9ba01a83d3975d7",
  measurementId: "G-N4QDLJ7X7J",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
