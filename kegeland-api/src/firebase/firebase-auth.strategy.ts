import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private readonly firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validates a token
   * @param token
   * @returns user
   */
  async validate(token: string) {
    const user: any = await this.firebaseService.firebaseAdmin
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        let msg = undefined;
        if (err instanceof Error) msg = err.message;
        throw new UnauthorizedException(msg);
      });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
