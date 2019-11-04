export const setCompanySession = (company, wastes, containers) => {
  sessionStorage.setItem('COMPANY', company);
  sessionStorage.setItem('COMPANY_WASTES', wastes);
  sessionStorage.setItem('COMPANY_CONTAINERS', containers);
};

export const getCompanySession = () => ({
  company: sessionStorage.setItem('COMPANY'),
  wastes: sessionStorage.setItem('COMPANY_WASTES'),
  containers: sessionStorage.setItem('COMPANY_CONTAINERS')
});
