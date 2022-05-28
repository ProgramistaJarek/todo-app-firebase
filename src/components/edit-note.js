import { useState, useEffect } from 'react';
import Header from './header';
import { useLocation } from 'react-router-dom';

import { getOneNoteByNoteId, updateNote } from '../services/firebase';

function EditNote() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [styleError, seStyleError] = useState(false);

  const location = useLocation();
  const noteId = location.state;

  const handleEdit = async (e) => {
    e.preventDefault();
    const didUpdate = await updateNote(title, text, color, noteId);
    console.log(didUpdate);
    if (didUpdate) seStyleError(false);
    else seStyleError(true);
  };

  useEffect(() => {
    document.title = 'Edit a note';
    async function getOneNote() {
      const note = await getOneNoteByNoteId(noteId);
      setTitle(note.title);
      setText(note.text);
    }
    getOneNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-4">
        {styleError ? (
          <div className="bg-red-500 px-16 py-4 rounded mb-4">
            <p className="font-bold tracking-widest text-center">
              Something went wrong!
            </p>
          </div>
        ) : null}
        <h1>Edit your note down here!</h1>
        <form
          onSubmit={handleEdit}
          method="POST"
          className="mt-4 flex flex-col container items-end md:max-w-xl"
        >
          <input
            aria-label="Title"
            type="text"
            placeholder="Write a title"
            className="text-sm text-gray-base w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            aria-label="Text"
            type="text"
            placeholder="Write your text here"
            className="text-sm text-gray-base w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <select
            name="colors"
            id="colors"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="block appearance-none px-4 py-2 pr-8 rounded border"
          >
            <option value="">Pick a color</option>
            <option value="#00FF00">Green</option>
            <option value="#FF0000">Red</option>
            <option value="#0000FF">Blue</option>
            <option value="#FFFF00">Yellow</option>
          </select>
          <button
            type="submit"
            className="bg-yellow-500 mt-2 py-2 px-6 rounded"
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditNote;
