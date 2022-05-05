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
            <NavLink to="/Profile" className="item">
              <a>Profil</a>
            </NavLink>
            <NavLink to="/SimpleLineChart" className="item">
              <a>Graf</a>
            </NavLink>
            <NavLink to="/logout" className="item">
              <a>Odhlásit se</a>
            </NavLink>
          </div>
        </div>
        <div className="/ten wide column"></div>
      </div>
    </div>
  );
};

export default UserDashboard;
