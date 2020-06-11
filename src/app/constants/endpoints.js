const BASE_URL = 'https://api.dev.ambarplus.com';
const getCompanyBase = (companyId) => `${BASE_URL}/company/${companyId.toLowerCase()}`;

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/sign_in`,
  REFRESH_TOKEN: `${BASE_URL}/auth/token`,
  COMPANY: `${BASE_URL}/company`,
  GET_ROUTE: (companyId) => `${getCompanyBase(companyId)}/vehicle`,
  GET_CONTAINERS_BY_COMPANY: (companyId) => `${getCompanyBase(companyId)}/container`,
  GET_WASTES_BY_COMPANY: (companyId) => `${getCompanyBase(companyId)}/waste`,
  ROUTE: `${BASE_URL}/company/amb/route`,
  DCS: `${BASE_URL}/dcs`,
  GET_NOTES: `${BASE_URL}/notes`,
  
};

export default ENDPOINTS;
