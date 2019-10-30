export const setUserHeaders = (headers) => {
  sessionStorage.setItem('ACCESS_TOKEN', headers['access-token']);
  sessionStorage.setItem('TOKEN_TYPE', headers['token-type']);
  sessionStorage.setItem('UID', headers.uid);
  sessionStorage.setItem('EXPIRY', headers.expiry);
  sessionStorage.setItem('CLIENT', headers.client);
};

export const getUserHeaders = () => ({
  'access-token': sessionStorage.getItem('ACCESS_TOKEN'),
  'token-type': sessionStorage.getItem('TOKEN_TYPE'),
  'uid': sessionStorage.getItem('UID'),
  'expiry': sessionStorage.getItem('EXPIRY'),
  'client': sessionStorage.getItem('CLIENT'),
});
