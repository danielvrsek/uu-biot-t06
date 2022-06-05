import React, { useState } from 'react';

import CreateUser from '../components/adminDashboard/CreateUser';
import ActiveUsers from '../components/adminDashboard/ActiveUsers';
import Profile from '../components/user/Profile';
import Logout from '../components/logOut/Logout';

import RightMenu from '../components/navBars/RightMenu';
import MidContentDisplay from '../components/contentDisplay/MidContentDisplay';
import EditUser from '../components/user/EditUser';

const AdminDashboard = () => {
    const [activeComponent, setActiveComponent] = useState(0);
    const MenuData = ['Aktivní úživatele', 'Přidat uživatele', 'Můj profil', 'Odhlásit se'];
    const MidData = [<ActiveUsers />, <CreateUser />, <Profile />, <Logout />, <EditUser />];

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
                        setActiveCOmponent={setActiveComponent}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
