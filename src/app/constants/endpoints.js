const BASE_URL = 'https://api.dev.ambarplus.com';

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/sign_in`,
  REFRESH_TOKEN: `${BASE_URL}/auth/token`,
  COMPANY: `${BASE_URL}/company`,
  GET_ROUTE: `${BASE_URL}/company/amb/vehicle`,
  GET_CONTAINERS_BY_COMPANY: `${BASE_URL}/company/amb/container`,
  GET_WASTES_BY_COMPANY: `${BASE_URL}/company/amb/waste`,
  ROUTE: `${BASE_URL}/company/amb/route`,
  DCS: `${BASE_URL}/dcs`
};

export default ENDPOINTS;
