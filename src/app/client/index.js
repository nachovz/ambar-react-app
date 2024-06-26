import 'fetch-everywhere';
import axios from 'axios';
import https from 'https';
import omitBy from 'app/utils/omitBy';
import { setUserHeaders, getUserHeaders, deleteUserSession } from 'app/utils/auth/userSession';

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

const makeRequest = async (
	url, 
	{ 
		body, 
		headers, 
		method, 
		responseType, 
		ignoreThrow=false 
	}
) => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: buildHeaders(headers),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      responseType
    });
    return successHandler(response);
  } catch (error) {
    return errorHandler(error, ignoreThrow);
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
  if (response.data && response.data === "offline") return null;//no tocar headers. guardado en backgroundSync
  setUserHeaders(response.headers);
  return response.data;
};

function errorHandler(error, ignoreThrow) {
  error.message = 'Hubo un error en el servidor';
  if(error.response && error.response.status){
    switch (error.response.status){
      case 401:
        error.message = "Su sesión ha expirado. Por favor iniciar sesión nuevamente.";
        deleteUserSession();
        break;
      case 404:
        error.message = "No hay datos para esta solicitud. Comuníquese con Oficina.";
        if(ignoreThrow) return { data: [] };
        break;
      case 422:
        error.message = "No se ha encontrado esta matrícula en a esta empresa.";
        break;
			case 500:
				error.message = "Hubo un error en el servidor, por favor espere unos segundos e intente de nuevo.";
				break;
      default:
        break;
    }
  }else{
    error.response = { status: 400 };
    error.message = "No hay conexión."
  }
  throw error;
}

export default client;
