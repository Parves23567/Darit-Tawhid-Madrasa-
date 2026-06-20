// ─── Firebase Configuration ───────────────────────────────────────────────
// দারুত তাওহীদ ক্যাডেট মাদ্রাসা ম্যানেজমেন্ট সিস্টেম

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjZD9zSElP0Nr7PqyA2hU7eZ3VrCAVtqg",
  authDomain: "darut-tawhid-cadet-madrasa.firebaseapp.com",
  projectId: "darut-tawhid-cadet-madrasa",
  storageBucket: "darut-tawhid-cadet-madrasa.firebasestorage.app",
  messagingSenderId: "881070922042",
  appId: "1:881070922042:web:f51fb1bc75bfa2aa029803",
  measurementId: "G-TG2SKW85Z7"
};

// ─── Initialize Firebase ───────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ─── Export Services ───────────────────────────────────────────────────────
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
