import { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../context/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );

  const { app } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(app);
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });
    return () => listener();
  }, [app]);

  return { user };
}
