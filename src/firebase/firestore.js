// ─── Firestore Helper Functions ───────────────────────────────────────────────
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ── Add a document (auto ID) ──
export const addDocument = async (collectionName, data) => {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref;
};

// ── Set a document (custom ID) ──
export const setDocument = async (collectionName, docId, data) => {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// ── Get a single document ──
export const getDocument = async (collectionName, docId) => {
  const snap = await getDoc(doc(db, collectionName, docId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ── Get all documents in a collection ──
export const getDocuments = async (collectionName) => {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ── Get documents with query ──
export const queryDocuments = async (collectionName, conditions = [], orderByField = null) => {
  let q = collection(db, collectionName);
  const constraints = conditions.map(([field, op, value]) => where(field, op, value));
  if (orderByField) constraints.push(orderBy(orderByField));
  q = query(q, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ── Update a document ──
export const updateDocument = async (collectionName, docId, data) => {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// ── Delete a document ──
export const deleteDocument = async (collectionName, docId) => {
  await deleteDoc(doc(db, collectionName, docId));
};

// ── Real-time listener ──
export const subscribeToCollection = (collectionName, callback) => {
  return onSnapshot(collection(db, collectionName), (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
};

export { serverTimestamp };
