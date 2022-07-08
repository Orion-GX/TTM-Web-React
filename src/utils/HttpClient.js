import axios from 'axios';
import join from 'url-join';
import { apiUrl, server } from '../constants/config';
import { store } from './../index';

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }

  const userToken = localStorage.getItem(server.ACCESS_TOKEN);
  // console.log("config ",congfig);
  if (userToken) {
    config.headers = { Authorization: `Bearer ${userToken}` };
  }
  config.timeout = 10000; // 10 Second

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { dispatch } = store;
    console.log(JSON.stringify(error, null, 4));

    if (error.response.status === 401) {
      const access_token = localStorage.getItem(server.ACCESS_TOKEN);
      const refresh_token = localStorage.getItem(server.REFRESH_TOKEN);
      const uuid = localStorage.getItem(server.UUID);
      const refreshUrl = `${apiUrl}${server.REFRESH_TOKEN_URL}/${uuid}`;

      try {
        const result = await fetch(refreshUrl, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${refresh_token}`
          },
          body: JSON.stringify({ access_token: `${access_token}` })
        })
          .then((result) => result.json())
          .then(
            (actualData) => (
              localStorage.setItem(
                server.ACCESS_TOKEN,
                actualData.result.access_token
              ),
              window.location.reload()
            )
          );
      } catch (error) {
        localStorage.removeItem(server.ACCESS_TOKEN);
        localStorage.removeItem(server.REFRESH_TOKEN);
        window.location.href = '/auth/login';
      }
    } else if (error.response.status === 403) {
      // force logout
      localStorage.removeItem(server.ACCESS_TOKEN);
      localStorage.removeItem(server.REFRESH_TOKEN);
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      // alert(JSON.stringify(error));
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE
      });
    }

    return Promise.reject(error);
  }
);

export const httpClient = axios;
