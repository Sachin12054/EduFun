import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZG8hSO_JebcTL5n63QH-3exXCvVAmnPg",
  authDomain: "edufun-9f382.firebaseapp.com",
  projectId: "edufun-9f382",
  storageBucket: "edufun-9f382.firebasestorage.app",
  messagingSenderId: "533887690099",
  appId: "1:533887690099:web:9a8ba418fd85acd7ebd106",
  measurementId: "G-RK9XQ05FZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;