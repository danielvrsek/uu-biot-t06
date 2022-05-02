import React, { useContext, useState } from 'react';
import { UserContext } from '../components/context/UserContext';
import { UserTokenContext } from '../components/context/UserTokenContext';
import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';
import { Navigate } from 'react-router-dom';

const SignUpPolicy = () => {
  const { user, setUser } = useContext(UserContext);
  const { userToken } = useContext(UserTokenContext);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);

  if (user === null) {
    axios
      .get(`${getBasePath()}/profile`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
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
