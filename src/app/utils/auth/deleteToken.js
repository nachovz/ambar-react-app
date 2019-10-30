const deleteToken = () => {
  if (sessionStorage.getItem('ACCESS_TOKEN')) {
    sessionStorage.removeItem('ACCESS_TOKEN');
  }
};

export default deleteToken;
