import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function saveNote(noteTitle, noteText, userId) {
  return await addDoc(collection(db, 'notes'), {
    title: noteTitle,
    text: noteText,
    uid: userId,
  });
}

export async function getNotes(userId) {
  const q = query(collection(db, 'notes'), where('uid', '==', userId));

  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return notes;
}
