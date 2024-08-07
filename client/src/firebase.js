import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "apcodingsolution.firebaseapp.com",
  projectId: "apcodingsolution",
  storageBucket: "apcodingsolution.appspot.com",
  messagingSenderId: "935096502516",
  appId: "1:935096502516:web:341747b20e8b202a7a36a1",
  measurementId: "G-J8VRSVJLG7",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
