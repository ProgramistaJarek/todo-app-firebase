import { deleteNote } from '../../services/firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function Note({ id, text, title, bgColor, noteId }) {
  const handleDelete = async () => {
    await deleteNote(noteId);
  };

  return (
    <>
      <div
        className={
          bgColor
            ? `flex flex-col p-4 m-2 rounded-md w-40 h-48`
            : `flex flex-col bg-[red] p-4 m-2 rounded-md w-40 h-48`
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
