import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export async function saveNote(noteTitle, noteText, userId, color) {
  return addDoc(collection(db, 'notes'), {
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

export async function deleteNote(noteId) {
  return deleteDoc(doc(db, 'notes', noteId));
}

export async function getOneNoteByNoteId(noteId) {
  const querySnapshot = await getDocs(collection(db, 'notes'));
  let note;
  querySnapshot.forEach((doc) => {
    if (doc.id === noteId) note = doc.data();
  });

  return note;
}
