import Home from '../../pages/Home';

import Login from '../../pages/Login';
import CustomerInfo from '../../pages/CustomerInfo';
import InDevelopment from '../inDevelopment/InDevelopment';
import EditUser from '../user/EditUser';
import DeleteUser from '../user/DeleteUser';

import WorkspaceList from '../../admin_console/pages/workspaceList';
import WorkspaceDetail from '../../admin_console/pages/workspaceDetail';
import WeatherstationDetail from '../../admin_console/pages/weatherstationDetail';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: false,
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
    {
        path: '/workspaces',
        exact: true,
        component: WorkspaceList,
        name: 'Workspaces',
        protected: true,

    },
    {
        path: '/workspaces/:id',
        exact: true,
        component: WorkspaceDetail,
        name: 'Workspace detail',
        protected: true,
  
    },
    {
        path: '/weatherstations/:id',
        exact: true,
        component: WeatherstationDetail,
        name: 'Weatherstation detail',
        protected: true,
  
    }
];

export default routes;
