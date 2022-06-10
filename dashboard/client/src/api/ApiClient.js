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
    getWeatherData: async (dateFrom, dateTo, granularity) => getMethod(`/weather-data/gateway/629c75a8f54e0f35c1f6bc39?dateFrom=${dateFrom}&dateTo=${dateTo}`),
    logout: () => postMethod('/auth/logout'),
    createGateway: async (name) => postMethod('/gateway', {name}),
};

export default ApiClient;
