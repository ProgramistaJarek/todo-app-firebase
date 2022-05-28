import { Navigate, Outlet } from 'react-router-dom';

function IsUserLoggedIn({ user, redirectPath, children }) {
  if (user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
}

export default IsUserLoggedIn;
