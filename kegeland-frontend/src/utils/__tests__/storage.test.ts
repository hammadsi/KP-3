import { Token } from '../../state/ducks/auth/auth.helpers';
import {
  removeTokens,
  retrieveToken,
  retrieveTokens,
  storeTokens,
} from '../storage';

describe('Test sesison utils', () => {
  beforeAll(async () => {
    localStorage.setItem('access_token', 'accessToken');
    localStorage.setItem('id_token', 'idToken');
    localStorage.setItem('refresh_token', 'refreshToken');
  });
  //   afterAll(() => removeTokens());

  it('storeTokens should store tokens', async () => {
    await storeTokens({
      accessToken: 'access token',
      idToken: 'id token',
      refreshToken: 'refresh token',
      expiresIn: 10,
    });
    const tokens = await retrieveTokens();
    expect(tokens).toEqual({
      [Token.ACCESS_TOKEN]: 'access token',
      [Token.ID_TOKEN]: 'id token',
      [Token.REFRESH_TOKEN]: 'refresh token',
    });
  });

  it('retriveToken should return "access token"', async () => {
    const token = await retrieveToken(Token.ACCESS_TOKEN);
    expect(token).toEqual('access token');
  });

  test('removeTokens should remove tokens', async () => {
    removeTokens();
    await expect(retrieveTokens()).rejects.toThrow('Failed to retrieve tokens');
  });
});
