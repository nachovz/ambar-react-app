const deleteToken = () => {
  if (sessionStorage.getItem('AUTH_TOKEN')) {
    sessionStorage.removeItem('AUTH_TOKEN');
  }
};

export default deleteToken;
