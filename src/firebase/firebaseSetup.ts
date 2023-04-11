import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import config from '../config';

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage(app);

export { db, storage, app };
