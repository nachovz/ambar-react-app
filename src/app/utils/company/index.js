export const setCompanySession = (company, wastes, containers, notes) => {
  localStorage.setItem('COMPANY', JSON.stringify(company));
  localStorage.setItem('COMPANY_WASTES', JSON.stringify(wastes));
  localStorage.setItem('COMPANY_CONTAINERS', JSON.stringify(containers));
  localStorage.setItem('COMPANY_NOTES', JSON.stringify(notes));
};

export const getCompanySession = () => ({
  companyId: JSON.parse(localStorage.getItem('COMPANY')),
  wastes: JSON.parse(localStorage.getItem('COMPANY_WASTES')),
  containers: JSON.parse(localStorage.getItem('COMPANY_CONTAINERS')),
  notes: JSON.parse(localStorage.getItem('COMPANY_NOTES'))
});

export const deleteCompanySession = () => {
  /*if (localStorage.getItem('COMPANY')) {
    localStorage.removeItem('COMPANY');
  }*/
  if (localStorage.getItem('COMPANY_WASTES')) {
    localStorage.removeItem('COMPANY_WASTES');
  }
  if (localStorage.getItem('COMPANY_CONTAINERS')) {
    localStorage.removeItem('COMPANY_CONTAINERS');
  }
  if (localStorage.getItem('COMPANY_NOTES')) {
    localStorage.removeItem('COMPANY_NOTES');
  }
};

export const formatCompanyNotes = (notes, type) => (
  notes.data
  .filter((note) => note.type === `${type}`)
  .map((note) => ({
    label: note.description,
    on: false,
    comment: ''
  }))
);