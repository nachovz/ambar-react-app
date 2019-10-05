const BASE_URL = 'https://api-visor.ambarplus.com';

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH_TOKEN: `${BASE_URL}/auth/token`,
  WORKWAVE_VEHICLES: `${BASE_URL}/workwave/routes`
};

export default ENDPOINTS;
