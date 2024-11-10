const backendServer = 'http://localhost:5000';

const loginAPI = `${backendServer}/api/auth/login`;
const registerAPI = `${backendServer}/api/auth/register`;

const apiRoutes = {
  loginAPI,
  registerAPI,
};

export default apiRoutes;
