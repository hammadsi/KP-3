import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getAuth } from 'firebase-admin/auth';
import firebaseConfig from 'src/config/firebase.config';
import { ConfigType } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { plainToInstance } from 'class-transformer';
import { sendPasswordResetEmail, getAuth as getSdkAuth } from 'firebase/auth';

import { isAxiosError } from '../utils/isAxiosError';

import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { RefreshErrorResponse, RefreshResponse } from './auth.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenCredentials } from './entities/token-credentials.entity';
import { signInUser } from './auth.helpers';
import { UserDetailsEntity } from './entities/user-details.entity';
import { UserEntity } from './entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
  ) {}

  /**
   * Function for logging user into system
   * @param loginCredentials {email: string, password: string}
   * @returns authenticated UserEntity
   */
  async login(loginCredentials: LoginCredentialsDto) {
    const { email, password } = loginCredentials;
    const { id, tokens } = await signInUser(email, password);
    const details = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .get()
      .then((res) => plainToInstance(UserDetailsEntity, res.data()));
    return plainToInstance(UserEntity, { id, email, details, tokens });
  }

  /**
   * Function used to log out users - revokes auth tokens
   * @param userId
   * @returns Promise<void>
   */
  async logout(userId: string) {
    return this.firebaseService.firebaseAdmin
      .auth()
      .revokeRefreshTokens(userId);
  }

  /**
   * Function used to register new users to the system
   * @param registerCredentials {password: string, name?: string, email: string, password: string, roles: Role[]}
   * @returns id of registered user, or throws error
   */
  async register(registerCredentials: RegisterCredentialsDto) {
    const { email, password, ...details } = registerCredentials;

    // Create new user and set custom roles
    const userId = await this.firebaseService.firebaseAdmin
      .auth()
      .createUser({ email, password })
      .then((res) => {
        getAuth().setCustomUserClaims(res.uid, { roles: details.roles });
        return res.uid;
      })
      .catch((err) => {
        if (err instanceof Error) {
          throw new BadRequestException(err.message);
        }
        throw new InternalServerErrorException();
      });
    // Add additional user details
    await this.firebaseService.firestore
      .collection('userDetails')
      .doc(userId)
      .set({ ...details, email })
      .catch((err) => {
        if (err instanceof Error) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException();
      });

    // Sign in user and generate tokens
    const { tokens } = await signInUser(email, password);
    return plainToInstance(UserEntity, { id: userId, email, details, tokens });
  }

  /**
   * Function to reset email for user
   * @param email as {email:string} sends
   * @returns sends a password reset email to the given email address.
   */
  async resetPassword({ email }: ResetPasswordDto) {
    return sendPasswordResetEmail(getSdkAuth(), email);
  }

  /**
   * Function to issue new auth credentials for user
   * @param refreshToken as {refreshToken: string}
   * @returns new token credentials
   */
  async refresh({ refreshToken }: RefreshTokenDto) {
    return this.httpService.axiosRef
      .post<RefreshResponse>(
        `https://securetoken.googleapis.com/v1/token?key=${this.config.sdk.apiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      )
      .then((res) => {
        const { access_token, id_token, refresh_token, expires_in } = res.data;
        return new TokenCredentials({
          accessToken: access_token,
          idToken: id_token,
          refreshToken: refresh_token,
          expiresIn: parseInt(expires_in),
        });
      })
      .catch((err) => {
        if (isAxiosError<RefreshErrorResponse>(err)) {
          const { message } = err.response.data.error;
          switch (message) {
            case 'USER_DISABLED':
              throw new BadRequestException('This user has been disabled.');
            case 'INVALID_REFRESH_TOKEN':
              throw new BadRequestException('Invalid refresh token.');
            case 'TOKEN_EXPIRED':
              throw new BadRequestException('The refresh token has expired.');
            case 'USER_NOT_FOUND':
              throw new BadRequestException(
                'The requested user credentials does not exist.',
              );
          }
        }
        throw new InternalServerErrorException();
      });
  }
}
