import { lazy, Suspense } from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import 'react-loading-skeleton/dist/skeleton.css';

import IsUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const AddNote = lazy(() => import('./components/add-note'));
const ShowNotes = lazy(() => import('./components/notes/index'));
const EditNote = lazy(() => import('./components/edit-note'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              element={
                <IsUserLoggedIn user={user} redirectPath={ROUTES.DASHBOARD} />
              }
            >
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            </Route>

            <Route
              element={
                <IsUserLoggedIn user={!user} redirectPath={ROUTES.LOGIN} />
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

              <Route path={ROUTES.ADD_A_NOTE} element={<AddNote />} />
              <Route path={ROUTES.SHOW_A_NOTES} element={<ShowNotes />} />
              <Route path={ROUTES.EDIT_A_NOTE} element={<EditNote />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
