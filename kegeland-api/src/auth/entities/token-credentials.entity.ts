import { Expose, Transform } from 'class-transformer';

export class TokenCredentials {
  @Expose()
  accessToken: string;
  @Expose()
  idToken: string;
  @Expose()
  refreshToken: string;
  @Expose()
  @Transform(({ value }) => parseInt(value))
  expiresIn: number;

  constructor(data: Partial<TokenCredentials>) {
    Object.assign(this, data);
  }
}
