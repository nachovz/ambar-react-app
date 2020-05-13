export const setUserHeaders = (headers) => {
  localStorage.setItem('ACCESS_TOKEN', headers['access-token']);
  localStorage.setItem('TOKEN_TYPE', headers['token-type']);
  localStorage.setItem('UID', headers.uid);
  localStorage.setItem('EXPIRY', headers.expiry);
  localStorage.setItem('CLIENT', headers.client);
};

export const getUserHeaders = () => ({
  'access-token': localStorage.getItem('ACCESS_TOKEN'),
  'token-type': localStorage.getItem('TOKEN_TYPE'),
  'uid': localStorage.getItem('UID'),
  'expiry': localStorage.getItem('EXPIRY'),
  'client': localStorage.getItem('CLIENT'),
});

export const getAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

const SESSION_HEADERS = ['ACCESS_TOKEN', 'TOKEN_TYPE', 'UID', 'EXPIRY', 'CLIENT'];

export const deleteUserSession = () => {
  SESSION_HEADERS.forEach((header) => {
    if (localStorage.getItem(header)) {
      localStorage.removeItem(header);
    }
  });
};
