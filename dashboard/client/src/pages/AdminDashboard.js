import React, { useContext, useState } from 'react';
import { UserContext } from '../components/context/UserContext';
import CreateUser from '../components/AdminDashboard/CreateUser';
import ActiveUsers from '../components/AdminDashboard/ActiveUsers';
import Profile from '../components/Profile/Profile';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [activeComponent, setActiveComponent] = useState('');

  function setActive() {
    if (activeComponent === '1') {
      return <CreateUser />;
    }
    if (activeComponent === '2') {
      return <ActiveUsers />;
    }
    if (activeComponent === '3') {
      return <Profile />;
    }
  }

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="four wide column" style={{ marginTop: '50px' }}>
          <div className="ui vertical pointing menu">
            <a
              className={`item ${activeComponent === '1' ? 'active' : ''}`}
              onClick={() => setActiveComponent('1')}
            >
              Aktivní uživatele
            </a>
            <a
              className={`item ${activeComponent === '2' ? 'active' : ''}`}
              onClick={() => setActiveComponent('2')}
            >
              Přidat uživatele
            </a>
            <a
              className={`item ${activeComponent === '3' ? 'active' : ''}`}
              onClick={() => setActiveComponent('3')}
            >
              Muj profil
            </a>
          </div>
        </div>
        <div className="twelve wide column">{setActive()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
