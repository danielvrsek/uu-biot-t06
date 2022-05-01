import React, { useContext } from 'react';
import { UserContext } from '../components/context/UserContext';

const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return <div></div>;
};

export default AdminDashboard;
