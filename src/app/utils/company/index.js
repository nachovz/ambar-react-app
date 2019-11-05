export const setCompanySession = (company, wastes, containers, notes) => {
  sessionStorage.setItem('COMPANY', JSON.stringify(company));
  sessionStorage.setItem('COMPANY_WASTES', JSON.stringify(wastes));
  sessionStorage.setItem('COMPANY_CONTAINERS', JSON.stringify(containers));
  sessionStorage.setItem('COMPANY_NOTES', JSON.stringify(notes));
};

export const getCompanySession = () => ({
  company: JSON.parse(sessionStorage.getItem('COMPANY')),
  wastes: JSON.parse(sessionStorage.getItem('COMPANY_WASTES')),
  containers: JSON.parse(sessionStorage.getItem('COMPANY_CONTAINERS')),
  notes: JSON.parse(sessionStorage.getItem('COMPANY_NOTES'))
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
  if (sessionStorage.getItem('COMPANY_NOTES')) {
    sessionStorage.removeItem('COMPANY_NOTES');
  }
};

export const formatCompanyNotes = (notes, type) => (
  notes.data
  .filter((note) => note.type === `${type}`)
  .map((note) => ({
    label: note.description,
    on: false
  }))
);