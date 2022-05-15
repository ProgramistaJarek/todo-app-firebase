import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from 'firebase/firestore';

export async function saveNote(noteTitle, noteText, userId, color) {
  return await addDoc(collection(db, 'notes'), {
    title: noteTitle,
    text: noteText,
    uid: userId,
    createdDate: Timestamp.fromDate(new Date()),
    bgColor: color,
  });
}

export async function getNotes(userId) {
  const q = query(
    collection(db, 'notes'),
    orderBy('createdDate', 'desc'),
    where('uid', '==', userId)
  );

  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return notes;
}
