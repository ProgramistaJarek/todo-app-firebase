import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto flex align-center items-center justify-between content-center h-full">
        <div className="flex items-center">
          <Link to={ROUTES.ADD_A_NOTE} aria-label="Dashboard">
            Add a note
          </Link>
          <Link
            to={ROUTES.SHOW_A_NOTES}
            aria-label="Dashboard"
            className="ml-4"
          >
            Show notes
          </Link>
          <button type="button" className="ml-4">
            Show finish todos
          </button>
        </div>
        <div>
          <button
            type="button"
            title="Sign Out"
            onClick={() => {
              const auth = getAuth();
              signOut(auth);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const auth = getAuth();
                signOut(auth);
              }
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
