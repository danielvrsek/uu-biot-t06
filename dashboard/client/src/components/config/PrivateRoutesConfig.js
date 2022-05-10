import { Roles } from 'config';

import AdminDashboard from '../../pages/AdminDashboard';
import UserDashboard from '../../pages/UserDashboard';
import EditUser from '../EditUser/EditUser';
import DeleteUser from '../deleteUser/DeleteUser';

export default [
  {
    component: AdminDashboard,
    path: '/admin',
  },
];
