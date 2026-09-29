import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const getValidConfigValue = (envVal, fallbackVal) => {
  if (envVal && typeof envVal === 'string' && !envVal.includes('your_') && envVal.trim() !== '') {
    return envVal.trim();
  }
  return fallbackVal;
};

const firebaseConfig = {
  apiKey: getValidConfigValue(import.meta.env.VITE_FIREBASE_API_KEY, "AIzaSyCKQnRFxB3rhQdKLUoRE0NWJEDE1IkQUAw"),
  authDomain: getValidConfigValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "nanalipare-4da62.firebaseapp.com"),
  projectId: getValidConfigValue(import.meta.env.VITE_FIREBASE_PROJECT_ID, "nanalipare-4da62"),
  storageBucket: getValidConfigValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "nanalipare-4da62.firebasestorage.app"),
  messagingSenderId: getValidConfigValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "238539292909"),
  appId: getValidConfigValue(import.meta.env.VITE_FIREBASE_APP_ID, "1:238539292909:web:0190bb351f1cd461024ce4"),
  databaseURL: getValidConfigValue(import.meta.env.VITE_FIREBASE_DATABASE_URL, "https://nanalipare-4da62-default-rtdb.asia-southeast1.firebasedatabase.app")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

export default app;

