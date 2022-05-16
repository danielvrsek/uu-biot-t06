import React, { useState } from 'react';

import Profile from '../components/Profile/Profile';
import ChartMainPage from '../components/charts/ChartMainPage';
import Logout from '../components/logOut/Logout';

import RightMenu from '../components/navBars/RightMenu';
import MidContentDisplay from '../components/contentDisplay/MidContentDisplay';

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const MenuData = ['Profil', 'Data', 'Odhlásit se'];
  const MidData = [<Profile />, <ChartMainPage />, <Logout />];

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="five wide column" style={{ marginTop: '50px' }}>
          <div className="ui vertical pointing menu">
            <RightMenu
              MenuData={MenuData}
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          </div>
        </div>
        <div className="/ten wide column">
          <MidContentDisplay
            MidData={MidData}
            activeComponent={activeComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
