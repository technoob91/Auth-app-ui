
export const storeToken = (headers) => {

  localStorage.setItem('user', JSON.stringify({
    'access-token': headers['access-token'],
    'client': headers['client'],
    'uid': headers['uid']
  }));
}

export const getToken = () => {
  return localStorage.getItem('user');
}

export const removeToken = () => {
  localStorage.removeItem('user');
}

export const isAuthenticated = () => {
  return !!(localStorage.getItem('user'));
}