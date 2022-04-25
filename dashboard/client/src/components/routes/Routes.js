import Admin from '../../pages/AdminDashboard';
import Home from '../../pages/Home';
import User from '../../pages/UserDashboard';
import Login from '../../pages/Login';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    name: 'Home Page',
    protected: false,
  },
  {
    path: '/admin',
    exact: true,
    component: Admin,
    name: 'Admin Dashboard',
    protected: true,
  },
  {
    path: '/user',
    exact: true,
    component: User,
    name: 'User Dashboard',
    protected: true,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    name: 'Login',
    protected: false,
  },
];

export default routes;
