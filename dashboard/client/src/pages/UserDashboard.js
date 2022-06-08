import React, { useState } from "react";

import Profile from "../components/user/Profile";
import ChartMainPage from "../components/charts/ChartMainPage";
import Logout from "../components/logOut/Logout";

import RightMenu from "../components/navBars/RightMenu";
import MidContentDisplay from "../components/contentDisplay/MidContentDisplay";

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const MenuData = ["Profil", "Data", "Odhlásit se"];
  const MidData = [<Profile />, <ChartMainPage />, <Logout />];

  return (
    <>
      <div className="sixteen wide column">
        <MidContentDisplay
          MidData={MidData}
          activeComponent={activeComponent}
        />

        
      </div>
      <div className="bottomMenu" style={{ marginTop: "100px" }}>
          <RightMenu
            MenuData={MenuData}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </div>
        <div style={{height: "80px"}}></div>
    </>
  );
};

export default UserDashboard;
