import { app } from '../lib/firebase';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto flex align-center items-center justify-between content-center h-full">
        <div className="flex items-center">
          <button type="button">Add a note</button>
          <button type="button" className="ml-4">
            Show todos
          </button>
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
