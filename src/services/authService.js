import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export async function registerUser({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await setDoc(doc(db, 'users', credential.user.uid), { name, email, createdAt: serverTimestamp() });
  return credential.user;
}
export const loginUser = ({ email, password }) => signInWithEmailAndPassword(auth, email, password);
export const logoutUser = () => signOut(auth);
