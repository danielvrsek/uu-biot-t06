import Admin from '../../pages/AdminDashboard';
import Home from '../../pages/Home';
import User from '../../pages/UserDashboard';
import Login from '../../pages/Login';
import CustomerInfo from '../../pages/CustomerInfo';
import InDevelopment from '../inDevelopment/InDevelopment';
import SignUpPolicy from '../../pages/SignInPolicy';
import EditUser from '../EditUser/EditUser';
import DeleteUser from '../deleteUser/DeleteUser';

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
  {
    path: '/customer-info',
    exact: true,
    component: CustomerInfo,
    name: 'Customer Information page',
    protected: false,
  },
  {
    path: '/in-development',
    exact: true,
    component: InDevelopment,
    name: 'Page is in development mode',
    protected: false,
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignUpPolicy,
    name: 'Sign in',
    protected: true,
  },
  {
    path: '/edit/:id',
    exact: true,
    component: EditUser,
    name: 'Edit user',
    protected: true,
  },
  {
    path: '/delete/:id',
    exact: true,
    component: DeleteUser,
    name: 'Delete user',
    protected: true,
  },
];

export default routes;
