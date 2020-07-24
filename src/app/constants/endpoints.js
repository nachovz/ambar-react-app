const BASE_URL = 'https://ambar-api.eu.ngrok.io';//'https://api.dev.ambarplus.com';
const COMPANY_BASE = (companyId) => `${BASE_URL}/company/${companyId}`;

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/sign_in`,
  REFRESH_TOKEN: `${BASE_URL}/auth/token`,
  COMPANY_INFO: (companyId) => `${COMPANY_BASE(companyId)}`,
  ROUTE: (companyId) => `${COMPANY_BASE(companyId)}/vehicle`,
  CONTAINERS_BY_COMPANY: (companyId) => `${COMPANY_BASE(companyId)}/container`,
  WASTES_BY_COMPANY: (companyId) => `${COMPANY_BASE(companyId)}/waste`,
  ROUTE_POST: (companyId) => `${COMPANY_BASE(companyId)}/route`,
  DCS: `${BASE_URL}/dcs`,
  GET_NOTES: (companyId) => `${COMPANY_BASE(companyId)}/notes`,
  
};

export default ENDPOINTS;
