import { getCompanyId } from "app/utils/company";

const BASE_URL = 'https://api.dev.ambarplus.com';
const COMPANY_BASE = `${BASE_URL}/company/${getCompanyId()}`;

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/sign_in`,
  REFRESH_TOKEN: `${BASE_URL}/auth/token`,
  COMPANY: `${BASE_URL}/company`,
  ROUTE: `${COMPANY_BASE}/vehicle`,
  CONTAINERS_BY_COMPANY: `${COMPANY_BASE}/container`,
  WASTES_BY_COMPANY: `${COMPANY_BASE}/waste`,
  ROUTE_POST: `${COMPANY_BASE}/route`,
  DCS: `${BASE_URL}/dcs`,
  GET_NOTES: `${BASE_URL}/notes`,
  
};

export default ENDPOINTS;
