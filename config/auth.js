import bearer from '@websanova/vue-auth/drivers/auth/bearer';
import axios from '@websanova/vue-auth/drivers/http/axios.1.x';
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';

const config = {
  auth: bearer,
  http: axios,
  router: router,
  tokenDefaultName: 'auth-token',
  tokenStore: ['cookie'],
  notFoundRedirect: {
    path: process.env.API_URL + '/home'
  },
  registerData: {
    url: process.env.API_URL + '/auth/register',
    method: 'POST',
    redirect: null,
  },
  loginData: {
    url: process.env.API_URL + '/auth/login',
    method: 'POST',
    redirect: '/home',
    fetchUser: true,
  },
  logoutData: {
    url: process.env.API_URL + '/auth/logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: true
  },
  fetchData: {
    url: process.env.API_URL + '/auth/user',
    method: 'GET',
    enabled: true
  },
  parseUserData (data) {
    return data || {}
  },
};

export default config;
