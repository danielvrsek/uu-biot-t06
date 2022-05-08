import React, { useState, useContext } from 'react';
import axios from 'axios';
import { getBasePath } from '../utils/pathHelper';
import { Navigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserTokenContext } from '../context/UserTokenContext';

const DeleteUser = () => {
  const { id } = useParams();
  const { userToken } = useContext(UserTokenContext);
  const [redirect, setRedirect] = useState(false);

  const deleteUser = async () => {
    await axios.delete(`${getBasePath()}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/admin'} />;
  }
  return (
    <div
      className="ui middle aligned container"
      style={{ marginTop: '50px', width: '400px' }}
    >
      <div className="ui negative message">
        <div className="header">Opravdu chcete smazat tento účet?</div>
        <p>Budou vymazána všechna data.</p>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button" onClick={deleteUser}>
            ANO
          </div>
          <NavLink to="/admin" className="ui basic red button">
            NE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
