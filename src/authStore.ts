import { getCookie, setCookie, removeCookie } from "typescript-cookie";

const TOKEN_KEY = "Authorization";

/**
 * Saves the authentication token to a cookie.
 * @param {Object} data - The authentication data.
 * @param {string} data.token - The authentication token.
 * @returns None
 */
export const saveAuthData = ({ token }) => {
  setCookie(TOKEN_KEY, token);
};

/**
 * Retrieves the token from the cookie storage.
 * @returns {string} The token value.
 */
export const getToken = () => {
  return getCookie(TOKEN_KEY);
};

/**
 * Clears the storage by removing the token key from the cookie.
 * @returns None
 */
export const clearStorage = () => {
  removeCookie(TOKEN_KEY);
  window.location.reload();
};
