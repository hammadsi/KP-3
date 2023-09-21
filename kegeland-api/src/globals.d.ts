import 'firebase/auth';

declare module 'firebase/auth' {
  interface User {
    accessToken: string;
  }

  interface UserCredential {
    _tokenResponse: {
      kind: string;
      localId: string;
      email: string;
      displayName: string;
      idToken: string;
      registered: true;
      refreshToken: string;
      expiresIn: string;
    };
  }
}
