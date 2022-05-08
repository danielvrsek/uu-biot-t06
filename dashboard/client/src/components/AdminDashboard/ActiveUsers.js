import React, { useState, useEffect, useContext } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import { getBasePath } from '../utils/pathHelper';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ActiveUsers = () => {
  const { userToken } = useContext(UserTokenContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userToken === null) {
      console.log('Uživatel nemá token');
    } else {
      axios
        .get(`${getBasePath()}/users`, {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ui cards" style={{ marginTop: '50px' }}>
      {users.length === 0 ? (
        <div> Relace vypršela prosím přihlašte se znovu</div>
      ) : (
        users.map((user, i) => {
          return (
            <div className="card" key={i}>
              <div className="content">
                <img
                  className="right floated mini ui image"
                  src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
                  alt="avatar"
                />
                <div className="header">{user.name}</div>
                <div className="meta">{user.email}</div>
                <div className="description">
                  <p>
                    Tento učet je v režimu: <b>{user.role}</b>
                  </p>
                </div>
              </div>
              <div className="extra content">
                <div className="ui two buttons">
                  <NavLink
                    to={`/edit/${user._id}`}
                    className="ui basic green button"
                  >
                    Editovat
                  </NavLink>
                  <NavLink
                    to={`/delete/${user._id}`}
                    className="ui basic red button"
                  >
                    Odstranit
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ActiveUsers;
