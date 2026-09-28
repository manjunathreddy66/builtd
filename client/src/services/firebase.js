import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCMeiaxUOAynLx-3e7ibwSz5JTCshvlPos',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'builtd.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://builtd-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'builtd',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'builtd.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '758086934006',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:758086934006:web:3d63930629ca1a6c277bd7',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-0KJZS3QJBQ'
};

export const isFirebaseConfigured = Boolean(
  (import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCMeiaxUOAynLx-3e7ibwSz5JTCshvlPos') && 
  (import.meta.env.VITE_FIREBASE_PROJECT_ID || 'builtd')
);

let app;
let auth;
let db;
let storage;
let googleProvider;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn('Firebase initialization in fallback mode:', error.message);
}

export { app, auth, db, storage, googleProvider };
