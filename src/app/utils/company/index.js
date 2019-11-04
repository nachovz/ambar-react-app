export const setCompanySession = (company, wastes, containers) => {
  sessionStorage.setItem('COMPANY', JSON.stringify(company));
  sessionStorage.setItem('COMPANY_WASTES', JSON.stringify(wastes));
  sessionStorage.setItem('COMPANY_CONTAINERS', JSON.stringify(containers));
};

export const getCompanySession = () => ({
  company: JSON.parse(sessionStorage.getItem('COMPANY')),
  wastes: JSON.parse(sessionStorage.getItem('COMPANY_WASTES')),
  containers: JSON.parse(sessionStorage.getItem('COMPANY_CONTAINERS'))
});

export const deleteCompanySession = () => {
  if (sessionStorage.getItem('COMPANY')) {
    sessionStorage.removeItem('COMPANY');
  }
  if (sessionStorage.getItem('COMPANY_WASTES')) {
    sessionStorage.removeItem('COMPANY_WASTES');
  }
  if (sessionStorage.getItem('COMPANY_CONTAINERS')) {
    sessionStorage.removeItem('COMPANY_CONTAINERS');
  }
};
