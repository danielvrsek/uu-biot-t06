import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { getBasePath } from '../utils/pathHelper';

const UserLogedIn = () => {
  const { user } = React.useContext(UserContext);

  return <div> {user === null ? <div></div> : <div>Jakub Pelz</div>}</div>;
};

export default UserLogedIn;
