import React, { useContext, useState } from 'react';
import { UserContext } from '../components/context/UserContext';
import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';
import { Navigate } from 'react-router-dom';

const SignUpPolicy = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const userNeed = user.payload;

  if (userNeed === undefined) {
    axios
      .get(`${getBasePath()}/profile`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setUser(res.data);
        if (res.data.payload.role === 'Admin') {
          setRedirectAdmin(true);
        }
        if (res.data.payload.role === 'User') {
          setRedirectUser(true);
        } else {
          console.log('Uživatel nemá zadanou roli.');
        }
      });
  }

  if (redirectAdmin) {
    return <Navigate to={'/admin'} />;
  }
  if (redirectUser) {
    return <Navigate to={'/user'} />;
  }

  return <div></div>;
};

export default SignUpPolicy;
