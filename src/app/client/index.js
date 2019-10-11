import 'fetch-everywhere';
import axios from 'axios';
import omitBy from 'app/utils/omitBy';
import getToken from 'app/utils/auth/getToken';
//import saveUser from 'app/utils/auth/saveUser';
//import deleteToken from 'app/utils/auth/deleteToken';
//import ENDPOINTS from 'app/constants/endpoints';

const client = {
  get: (url, options) => {
    const params = { ...options, method: 'GET' };
    return makeRequest(url, params);
  },

  post: (url, options) => {
    const params = { ...options, method: 'POST' };
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

const makeRequest = async (url, {
  body,
  omitRetry,
  headers,
  workwaveHeader,
  ...params
}) => {
  const options = {
    ...params,
    withCredentials: true,
    headers: {
      ...headers && headers,
      ...workwaveHeader && { 'X-WorkWave-Key': process.env.REACT_APP_X_WORKWAVE_KEY },
      ...getDefaultHeaders()
    },
    body
  };

  try {
    const response = await axios(url, options);
    return successHandler(response);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'jwt expired') {
      console.log('please refresh the token');
      // retryRequest(url, options);
    }
    errorHandler(error);
  }
};

const getDefaultHeaders = () => {
  const token = getToken();
  return omitBy({
    'Content-Type': 'application/json; charset=utf-8',
    ...token && { Authorization: `Bearer ${token}` }
  }, (item) => !item);
};

// const retryRequest = async (url, options) => {
//   try {
//     const response = await Request.post(ENDPOINTS.REFRESH_TOKEN, {
//
//     });
//     saveUser(response, response.token);
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
  return response.data;
};

function errorHandler(error) {
  console.error(error);
  throw error;
}

export default client;
