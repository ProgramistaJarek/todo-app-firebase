import { useState, useEffect, useContext } from 'react';
import Header from '../header';
import UserContext from '../../context/user';
import Skeleton from 'react-loading-skeleton';
import Note from './note';

import { getNotes } from '../../services/firebase';

function ShowNotes() {
  const user = useContext(UserContext);

  const [notes, setNotes] = useState();
  const [updateNotes, setUpdateNotes] = useState(true);

  async function checkNotesInDatabase() {
    const gettingNotesFromDatabase = await getNotes(user.uid);
    setNotes(gettingNotesFromDatabase);
    if (updateNotes === true) setUpdateNotes(false);
  }

  useEffect(() => {
    document.title = 'Show a notes';
    // if (updateNotes === true)
    checkNotesInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center container m-auto justify-center flex-wrap">
        {!notes ? (
          <Skeleton
            count={6}
            width={160}
            height={192}
            inline="false"
            containerClassName="text-center"
            className="m-2"
          />
        ) : notes.length ? (
          notes.map((e) => {
            return (
              <Note
                key={e.docId}
                text={e.text}
                title={e.title}
                bgColor={e.bgColor}
                noteId={e.docId}
                fun={checkNotesInDatabase}
              />
            );
          })
        ) : (
          'No notes'
        )}
      </div>
    </>
  );
}

export default ShowNotes;
