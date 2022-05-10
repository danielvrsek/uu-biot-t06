import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import routes from '../routes/Routes';
import { Admin, User } from './Roles';

const AuthRoute = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);

  /*   if (!user) {
    console.log('Nepřihlášený uživatel');

    return <Navigate to="/login" />;
  } */
  return <div>{children}</div>;
};

export default AuthRoute;
