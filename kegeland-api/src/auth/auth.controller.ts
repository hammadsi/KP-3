import {
  Post,
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

import { AuthUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TokenCredentials } from './entities/token-credentials.entity';
import { UserEntity } from './entities/user.entity';

/**
 * Controller for auth module
 */
@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Endpoint for authenticating existing user
   * @param loginCredentials log in parameters as body parameters: {email: string, passoword: string}
   * @returns authorised user object (UserEntity)
   */
  @Post('login')
  async login(
    @Body() loginCredentials: LoginCredentialsDto,
  ): Promise<UserEntity> {
    return this.authService.login(loginCredentials);
  }

  /**
   * Endpoint for revoking authentication for user (logging out of system)
   * @param userId id of user to be logged out
   * @returns Promise<void>
   */
  @Post('logout')
  @UseGuards(FirebaseAuthGuard)
  async logout(@AuthUser() userId: string) {
    return this.authService.logout(userId);
  }

  /**
   * Endpoint for registering new user to system
   * @param registerCredentials registration parameters as body: RegisterCredentialsDto
   * @returns registered user (UserEntity)
   */
  @Post('register')
  async register(
    @Body() registerCredentials: RegisterCredentialsDto,
  ): Promise<UserEntity> {
    return this.authService.register(registerCredentials);
  }

  /**
   * Enpoint for reseting password for user
   * @param reset email
   * @returns Promise<void>
   */
  @Post('reset')
  async resetPassword(@Body() reset: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(reset);
  }

  /**
   * Endpoint for getting new auth credentials
   * @param refreshToken refresh token from previous authentication call
   * @returns new token credentials
   */
  @Post('refresh')
  async refresh(
    @Body() refreshToken: RefreshTokenDto,
  ): Promise<TokenCredentials> {
    return this.authService.refresh(refreshToken);
  }
}
