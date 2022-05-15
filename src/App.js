import { lazy, Suspense } from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
// import { db } from './lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const AddNote = lazy(() => import('./components/add-note'));
const ShowNotes = lazy(() => import('./components/notes/index'));

function App() {
  const { user } = useAuthListener();
  // const getUsers = async () => {
  //   const citiesCol = collection(db, 'users');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   //console.log(cityList);
  //   return cityList;
  // };

  // getUsers();

  // async function getUserByUsername() {
  //   const userCol = collection(db, 'users');
  //   const userSnapshot = await getDocs(userCol);
  //   //const result = await firebase.firestore().collection('users').get();
  //   console.log(
  //     userSnapshot.docs.map((item) => ({
  //       docId: item.id,
  //     }))
  //   );

  //   return userSnapshot.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));
  // }

  // getUserByUsername();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ADD_A_NOTE} element={<AddNote />} />
            <Route path={ROUTES.SHOW_A_NOTES} element={<ShowNotes />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
