import React, { useContext } from 'react';
import { UserContext } from '../components/context/UserContext';
import Profile from '../components/Profile/Profile';
import { NavLink } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="five wide column" style={{ marginTop: '50px' }}>
          <div className="ui vertical pointing menu">
            <a className={`item active`}>Profile</a>

            <a className={`item `}>Data</a>

            <a className={`item `}>Odhlásit se</a>
          </div>
        </div>
        <div className="/ten wide column">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
