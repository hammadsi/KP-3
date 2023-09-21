import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { isFirebaseError } from 'src/utils/isFirebaseError';
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TokenCredentials } from './entities/token-credentials.entity';

/**
 * Firebase helper function to sign in user to system
 * @param email
 * @param password
 * @returns user id and access credentials
 */
export async function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .then(({ user: { accessToken, uid }, _tokenResponse }) => {
      return {
        id: uid,
        tokens: plainToInstance(
          TokenCredentials,
          { accessToken, ..._tokenResponse },
          {
            excludeExtraneousValues: true,
          },
        ),
      };
    })
    .catch((err) => {
      if (err instanceof Error) {
        if (isFirebaseError(err)) {
          switch (err.code) {
            case 'auth/invalid-email':
              throw new BadRequestException('This email is already in use.');
            case 'auth/user-disabled':
              throw new UnauthorizedException('This user has been disabled.');
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              throw new BadRequestException(
                'The email and/or password is invalid.',
              );
          }
        }
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException();
    });
}
