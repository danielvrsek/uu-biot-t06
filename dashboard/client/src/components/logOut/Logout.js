import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UserTokenContext } from '../context/UserTokenContext';
import { Navigate } from 'react-router-dom';

const Logout = ({}) => {
  const { setUser } = React.useContext(UserContext);
  const { setUserToken } = useContext(UserTokenContext);
  const [redirect, setRedirect] = useState(false);

  const submit = () => {
    setUser(null);
    setUserToken(null);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <div>
      <h2>Opravdu se chcete odhlásit?</h2>
      <button className="ui left floated button" onClick={submit}>
        Odhlásit se
      </button>
    </div>
  );
};

export default Logout;
