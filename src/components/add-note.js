import { useState, useEffect, useContext } from 'react';
import Header from './header';
import UserContext from '../context/user';

import { saveNote } from '../services/firebase';

function AddNote() {
  const user = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const photos = await saveNote(title, text, user.uid, color);
    setTitle('');
    setText('');
    setColor('');
    return photos;
  };

  useEffect(() => {
    document.title = 'Add a note';
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1>Write your note down here!</h1>
        <form onSubmit={handleLogin} method="POST">
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
          >
            <option value="">Pick a color</option>
            <option value="#00FF00">Green</option>
            <option value="red">Red</option>
            <option value="#0000FF">Blue</option>
            <option value="yellow">Yellow</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
