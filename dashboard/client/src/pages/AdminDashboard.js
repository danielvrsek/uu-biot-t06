import React, { useState } from 'react';

import CreateUser from '../components/AdminDashboard/CreateUser';
import ActiveUsers from '../components/AdminDashboard/ActiveUsers';
import Profile from '../components/Profile/Profile';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  function setActive() {
    if (activeComponent === '1') {
      return <ActiveUsers />;
    }
    if (activeComponent === '2') {
      return <CreateUser />;
    }
    if (activeComponent === '3') {
      return <Profile />;
    }
  }

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="five wide column" style={{ marginTop: '50px' }}>
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
        <div className="/ten wide column">
          {activeComponent === null ? (
            <div>"Vítejte v administrativním rozhraní. "</div>
          ) : (
            <div>{setActive()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
