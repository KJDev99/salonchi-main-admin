import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
request.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user?.access}`,
      };
      return config;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { request };
