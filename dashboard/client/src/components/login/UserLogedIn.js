import React from "react";
import { useAuth } from "../context/AuthContext";
import Logout from "../logOut/Logout";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const UserLogedIn = () => {
  const [{ user }] = useAuth();

  return (
    <div>
      {user == null ? (
        <div></div>
      ) : (
        <div>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src="https://m.actve.net/evropa2/2021/08/1257915-660x372.jpg"
            />

            <h3 style={{ marginTop: "8px" }}>
              {user.firstName} {user.lastname}
            </h3>
            <div style={{ marginTop: "5px" }}>
              <Logout />
            </div>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default UserLogedIn;
