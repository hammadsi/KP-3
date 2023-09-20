import { AuthTokens } from '../auth.interface';

const refreshResponseMock: AuthTokens = {
  accessToken: 'access token 2',
  idToken: 'id token 2',
  refreshToken: 'refresh token 2',
  expiresIn: 1000,
};

export default refreshResponseMock;
