import React from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = React.useContext(UserContext);
  return (
    <div>
      {user === null ? (
        <div> Relace vypršela prosím přihlašte se znovu</div>
      ) : (
        <div className="card">
          <div className="content">
            <img
              className="right floated mini ui image"
              src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
            />
            <div className="header">
              {user.payload.name} {user.payload.surname}
            </div>
            <div className="meta">{user.payload.email}</div>
            <div className="description">
              <p>
                Tento učet je v režimu: <b>{user.payload.role}</b>
              </p>
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div className="ui basic green button">Editovat</div>
              <div className="ui basic red button">Odstranit</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
