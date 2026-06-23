import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export function subscribeTransactions(userId, callback) {
  const q = query(collection(db, 'transactions'), where('userId', '==', userId), orderBy('date', 'desc'));
  return onSnapshot(q, (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}
export const addTransaction = (userId, data) => addDoc(collection(db, 'transactions'), { ...data, amount: Number(data.amount), userId, createdAt: serverTimestamp() });
export const updateTransaction = (id, data) => updateDoc(doc(db, 'transactions', id), { ...data, amount: Number(data.amount) });
export const deleteTransaction = (id) => deleteDoc(doc(db, 'transactions', id));

export function subscribeBudgets(userId, callback) {
  const q = query(collection(db, 'budgets'), where('userId', '==', userId), orderBy('month', 'desc'));
  return onSnapshot(q, (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}
export const addBudget = (userId, data) => addDoc(collection(db, 'budgets'), { ...data, limit: Number(data.limit), userId });
export const updateBudget = (id, data) => updateDoc(doc(db, 'budgets', id), { ...data, limit: Number(data.limit) });
export const deleteBudget = (id) => deleteDoc(doc(db, 'budgets', id));
