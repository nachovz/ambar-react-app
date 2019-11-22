import 'fetch-everywhere';
import axios from 'axios';
import https from 'https';
import omitBy from 'app/utils/omitBy';
import { setUserHeaders, getUserHeaders } from 'app/utils/auth/userSession';

const client = {
  get: (url, options) => {
    const params = { ...options, method: 'GET' };
    return makeRequest(url, params);
  },

  post: (url, options) => {
    const params = { ...options, method: 'post' };
    return makeRequest(url, params);
  },

  put: (url, options) => {
    const params = { ...options, method: 'PUT' };
    return makeRequest(url, params);
  },

  patch: (url, options) => {
    const params = { ...options, method: 'PATCH' };
    return makeRequest(url, params);
  },

  delete: (url, options) => {
    const params = { ...options, method: 'DELETE' };
    return makeRequest(url, params);
  },
};

const makeRequest = async (url, { body, headers, method }) => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: buildHeaders(headers),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    return successHandler(response);
  } catch (error) {
    errorHandler(error);
  }
};

const buildHeaders = (headers = {}) => {
  return omitBy({
    ...headers,
    ...getUserHeaders(),
    'Content-Type': 'application/json; charset=utf-8',
  }, (item) => !item);
};

const successHandler = (response) => {
  if (!response) return null;
  setUserHeaders(response.headers);
  return response.data;
};

function errorHandler(error) {
  console.error(error);
  throw error;
}

export default client;
