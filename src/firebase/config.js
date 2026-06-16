// ─── Firebase Configuration ───────────────────────────────────────────────
// দারুত তাওহীদ ক্যাডেট মাদ্রাসা ম্যানেজমেন্ট সিস্টেম
//
// ⚠️  IMPORTANT: Replace the placeholder values below with your actual
//     Firebase project credentials from https://console.firebase.google.com
//
// Steps:
//  1. Go to Firebase Console → Project Settings → General
//  2. Under "Your apps", click the web app icon (</>)
//  3. Copy the firebaseConfig object and paste it below

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// ─── Initialize Firebase ───────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ─── Export Services ───────────────────────────────────────────────────────
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
