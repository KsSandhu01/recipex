export const isAuthenticatedKey = 'isAuthenticated';

export const setInitialLoginStatus = () => {
  localStorage.setItem(isAuthenticatedKey, JSON.stringify(false));
};

export const setLoggedIn = () => {
  localStorage.setItem(isAuthenticatedKey, JSON.stringify(true));
};

export const setLoggedOut = () => {
  localStorage.setItem(isAuthenticatedKey, JSON.stringify(false));
};

export const isUserLoggedIn = () => {
  return JSON.parse(localStorage.getItem(isAuthenticatedKey) ?? 'false');
};