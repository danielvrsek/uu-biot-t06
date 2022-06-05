import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';

const getMethod = (path, headers) => axios.get(getBasePath() + path, { headers, withCredentials: true });
const postMethod = (path, payload, headers) =>
    axios.post(getBasePath() + path, payload, { headers, withCredentials: true });
const deleteMethod = (path, headers) => axios.delete(getBasePath() + path, { headers, withCredentials: true });
const putMethod = (path, payload, headers) =>
    axios.put(getBasePath() + path, payload, { headers, withCredentials: true });

const getHeaders = () => ({
    'Content-type': 'application/json',
});

const ApiClient = {
    getUserInfo: async () => getMethod('/auth/user-info'),
    getUserAvailableWorkspaces: async () => getMethod('/workspace/user'),
    setUserWorkspace: async (workspaceId) => putMethod('/workspace/user/current', { workspaceId }, getHeaders()),
    getUser: async (id) => getMethod(`/users/${id}`, getHeaders()),
    getUsers: async () => getMethod('/users', getHeaders()),
    editUser: async (id, user) => putMethod(`/users/${id}`, user, getHeaders()),
    deleteUser: async (id) => deleteMethod(`/users/${id}`, getHeaders()),
    addUser: async (user) => postMethod('/users', user, getHeaders()),
    login: async (credentials) => postMethod('/auth/login', credentials),
};

export default ApiClient;
