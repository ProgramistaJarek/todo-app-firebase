import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Signup() {
  const navigate = useNavigate();
  const { app, db } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAdress === '';

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, emailAdress, password)
      .then((userCredential) => {
        const user = userCredential.user;

        addDoc(collection(db, 'users'), {
          email: emailAdress,
          firstName: firstName,
          lastName: lastName,
          notes: [],
          uid: user.uid,
        });
        navigate(ROUTES.DASHBOARD);
      })
      .catch((error) => {
        setFirstName('');
        setLastName('');
        setEmailAdress('');
        setPassword('');
        setRepeatPassword('');
        setError(error.message);
      });
  };

  useEffect(() => {
    document.title = 'Sign up - Notes';
  }, []);

  return (
    <div className="px-6">
      <div className="container flex flex-col justify-center mx-auto max-w-screen-md h-[95vh]">
        <div className="mb-6">
          <h1 className="font-bold text-4xl">Create account</h1>
          <p className="font-bold text-gray-500 mt-2">
            Please fill the details and create account.
          </p>
        </div>
        <div className="mt-2">
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your first name"
              type="text"
              placeholder="First name"
              className="text-sm text-gray-base w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              aria-label="Enter your last name"
              type="text"
              placeholder="Last name"
              className="text-sm text-gray-base w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setEmailAdress(e.target.value)}
              value={emailAdress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              aria-label="Repeat your password"
              type="password"
              placeholder="Repeat your password"
              className="text-sm w-full py-6 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`mx-auto bg-blue-500 text-black rounded h-10 font-bold ${
                isInvalid && 'opacity-50 text-black'
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <p>Have an account?</p>
        <Link to={ROUTES.LOGIN} className="font-bold text-blue-500 ml-1">
          Login
        </Link>
      </div>
    </div>
  );
}
