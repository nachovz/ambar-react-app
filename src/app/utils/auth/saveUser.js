const saveUser = ({ access_token, refresh_token }) => {
  sessionStorage.setItem('AUTH_TOKEN', access_token);
  sessionStorage.setItem('REFRESH_TOKEN', refresh_token);
};

export default saveUser;
