import { app, db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function doesUsernameExist(emailAdress) {
  //   const result = await app
  //     .firestore()
  //     .collection('users')
  //     .where('email', '==', email.toLowerCase())
  //     .get();

  //   return result.docs.length > 0;
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where('email', '==', emailAdress.toLowerCase()));

  return q.getDocs;
}
