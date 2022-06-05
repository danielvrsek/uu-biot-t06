import axios from 'axios';
import { getBasePath } from '../components/utils/pathHelper';

const getMethod = (path, headers) => axios.get(getBasePath() + path, { headers });
const postMethod = (path, payload, headers) => axios.post(getBasePath() + path, payload, { headers });
const deleteMethod = (path, headers) => axios.delete(getBasePath() + path, { headers });
const putMethod = (path, payload, headers) => axios.put(getBasePath() + path, payload, { headers });

const getHeaders = (auth) =>
    auth
        ? {
              'Content-type': 'application/json',
          }
        : null;

const ApiClient = {
    getUserInfo: async (auth) => getMethod('/auth/user-info', getHeaders(auth)),
    getUser: async (id, auth) => getMethod(`/users/${id}`, getHeaders(auth)),
    getUsers: async (auth) => getMethod('/users', getHeaders(auth)),
    editUser: async (id, user, auth) => putMethod(`/users/${id}`, user, getHeaders(auth)),
    deleteUser: async (id, auth) => deleteMethod(`/users/${id}`, getHeaders(auth)),
    addUser: async (user, auth) => postMethod('/users', user, getHeaders(auth)),
    login: async (credentials) => postMethod('/auth/login', credentials),
};

export default ApiClient;
