import { useState, useEffect, useContext } from 'react';
import Header from './header';
import UserContext from '../context/user';

import { getNotes } from '../services/firebase';

function ShowNotes() {
  const user = useContext(UserContext);

  const [notes, setNotes] = useState();

  useEffect(() => {
    document.title = 'Show a notes';
    async function checkNotesInDatabase() {
      const notes = await getNotes(user.uid);
      console.log(notes);
    }
    checkNotesInDatabase();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1>Show notes</h1>
      </div>
    </>
  );
}

export default ShowNotes;
