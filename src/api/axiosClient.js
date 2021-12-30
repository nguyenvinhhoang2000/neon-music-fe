import axios from "axios";
import StorageKeys from "constants/storage-keys";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const logged = localStorage.getItem(StorageKeys.TOKEN);
    if (logged) config.headers.Authorization = `Bearer ${logged}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLS = ["api/auth/register", "api/auth/login"];
    if (URLS.includes(config.url) && status === 400) {
      throw new Error(data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
