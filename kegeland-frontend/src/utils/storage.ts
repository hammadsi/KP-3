import { Token } from '../state/ducks/auth/auth.helpers';
import { AuthTokens } from '../state/ducks/auth/auth.interface';

export const storeTokens = async ({
  accessToken,
  idToken,
  refreshToken,
}: AuthTokens) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('id_token', idToken);
  localStorage.setItem('refresh_token', refreshToken);
};

export const retrieveToken = async (token: Token) => {
  const res = localStorage.getItem(token);
  return res;
};

export const retrieveTokens = async () => {
  const accessToken = localStorage.getItem('access_token');
  const idToken = localStorage.getItem('id_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (!accessToken || !idToken || !refreshToken) {
    throw new Error('Failed to retrieve tokens');
  }

  return {
    access_token: accessToken,
    id_token: idToken,
    refresh_token: refreshToken,
  };
};

export const removeTokens = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('refresh_token');
};
