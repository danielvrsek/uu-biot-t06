import React, { useContext } from 'react';
import { UserContext } from '../components/context/UserContext';

const UserDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return <div></div>;
};

export default UserDashboard;
