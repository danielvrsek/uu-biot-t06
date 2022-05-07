import React, { useState } from 'react';

import CreateUser from '../components/AdminDashboard/CreateUser';
import ActiveUsers from '../components/AdminDashboard/ActiveUsers';
import Profile from '../components/Profile/Profile';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const MenuData = [
    'Aktivní úživatele',
    'Přidat uživatele',
    'Můj profil',
    'Odhlásit se',
  ];
  const ComponnetsData = [<ActiveUsers />, <CreateUser />, <Profile />];

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="five wide column" style={{ marginTop: '50px' }}>
          <div className="ui vertical pointing menu">
            {MenuData.map((item, i) => {
              return (
                <a
                  className={`item ${
                    activeComponent === MenuData.indexOf(item) ? 'active' : ''
                  }`}
                  onClick={() => setActiveComponent(MenuData.indexOf(item))}
                  key={i}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
        <div className="/ten wide column">
          {ComponnetsData.map((component, index) => {
            if (index === activeComponent)
              return <div key={index}>{component}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
