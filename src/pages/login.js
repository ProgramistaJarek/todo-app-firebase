import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const { app } = useContext(FirebaseContext);

  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAdress === '';

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, emailAdress, password)
      .then(() => {
        navigate(ROUTES.DASHBOARD);
      })
      .catch((error) => {
        setEmailAdress('');
        setPassword('');
        setError(error.message);
      });
  };

  useEffect(() => {
    document.title = 'Login - Notes';
  }, []);

  return (
    <div className="px-6">
      <div className="container flex flex-col justify-center mx-auto max-w-screen-md h-[95vh]">
        <div className="mb-6">
          <h1 className="font-bold text-4xl">Login</h1>
          <p className="font-bold text-gray-500 mt-2">
            Please sign up to continue.
          </p>
        </div>
        <div className="mt-2">
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm w-full py-6 px-4 h-2 border rounded mb-2"
              onChange={(e) => setEmailAdress(e.target.value)}
              value={emailAdress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm w-full py-6 px-4 h-2 border rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`w-1/3 mx-auto bg-blue-500 text-white rounded h-10 font-bold ${
                isInvalid && 'opacity-50 text-black'
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <p>Don't have an account?</p>
        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500 ml-1">
          Sign up
        </Link>
      </div>
    </div>
  );
}
