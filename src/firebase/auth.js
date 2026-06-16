// ─── Authentication Helper Functions ─────────────────────────────────────────
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

// Sign in
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out
export const logoutUser = () => signOut(auth);

// Create user
export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Password reset
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

// Update user profile
export const updateUserProfile = (displayName, photoURL) =>
  updateProfile(auth.currentUser, { displayName, photoURL });

// Auth state listener
export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);
