const TOKEN_KEY = "Authorization";

export const saveAuthData = ({ token }) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearStorage = () => {
  localStorage.clear();
};
