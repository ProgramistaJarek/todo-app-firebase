import { app, db } from '../lib/firebase';

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
            onClick={() => app.auth().signOut()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                app.auth().signOut();
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
