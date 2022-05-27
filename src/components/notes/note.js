import { deleteNote } from '../../services/firebase';
import { Link } from 'react-router-dom';

function Note({ text, title, bgColor, noteId, fun }) {
  const handleDelete = async () => {
    await deleteNote(noteId);
    fun();
  };

  return (
    <>
      <div
        className={
          bgColor
            ? `flex flex-col p-4 m-2 rounded-md w-40 h-48 `
            : `flex flex-col bg-[#23dfdf] p-4 m-2 rounded-md w-40 h-48 `
        }
        style={{ backgroundColor: `${bgColor}` }}
      >
        <p>{title}</p>
        <p className="overflow-hidden whitespace-nowrap">{text}</p>
        <Link to={`/edit-note/${noteId}`} state={noteId}>
          Edit
        </Link>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
}

export default Note;
