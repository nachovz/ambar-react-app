import 'fetch-everywhere';
import axios from 'axios';
import omitBy from 'app/utils/omitBy';
import getToken from 'app/utils/auth/getToken';
import { setUserHeaders, getUserHeaders } from 'app/utils/auth/userSession';
//import deleteToken from 'app/utils/auth/deleteToken';
//import ENDPOINTS from 'app/constants/endpoints';

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

// const retryRequest = async (url, options) => {
//   try {
//     const response = await Request.post(ENDPOINTS.REFRESH_TOKEN, {
//
//     });
//     return makeRequest(url, { ...options, omitRetry: true });
//   } catch (error) {
//     console.log('i was about to delete the token');
//     // deleteToken();
//   }
// };

const successHandler = (response) => {
  if (!response) return null;
  // if (!response.ok) {
  //   return response.json().then((result) => {
  //     throw result.errors;
  //   });
  // }
  console.log("SUCCESS RESPONSE", response);
  setUserHeaders(response.headers);
  return response.data;
};

function errorHandler(error) {
  console.error(error);
  throw error;
}

export default client;
