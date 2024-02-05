import { getCookie, setCookie, removeCookie } from "typescript-cookie";

const TOKEN_KEY = "Authorization";

export const saveAuthData = ({ token }) => {
  setCookie(TOKEN_KEY, token);
};

export const getToken = () => {
  return getCookie(TOKEN_KEY);
};

export const clearStorage = () => {
  removeCookie(TOKEN_KEY)
};
