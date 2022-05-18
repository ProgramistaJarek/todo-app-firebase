import { useState, useEffect, useContext } from 'react';
import Header from '../header';
import UserContext from '../../context/user';
import Skeleton from 'react-loading-skeleton';
import Note from './note';

import { getNotes } from '../../services/firebase';

function ShowNotes() {
  const user = useContext(UserContext);

  const [notes, setNotes] = useState();

  useEffect(() => {
    document.title = 'Show a notes';
    async function checkNotesInDatabase() {
      const notes = await getNotes(user.uid);
      setNotes(notes);
    }
    checkNotesInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  return (
    <>
      <Header />
      <div className="flex items-center container m-auto justify-center flex-wrap">
        {!notes ? (
          <Skeleton count={3} width={640} height={600} className="mb-6" />
        ) : (
          notes.map((e) => {
            return (
              <Note
                key={e.docId}
                text={e.text}
                title={e.title}
                bgColor={e.bgColor}
                noteId={e.docId}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default ShowNotes;
