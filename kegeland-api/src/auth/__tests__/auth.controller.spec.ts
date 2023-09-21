import * as request from 'supertest';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { Role } from 'src/roles/enums/role.enum';
import { authServiceMock } from 'src/__mocks__';

import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

describe('QuestionnairesController', () => {
  let authController: AuthController;
  let spyService: AuthService;
  let app: INestApplication;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({ ...authServiceMock }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [ApiServiceProvider],
    })
      .overrideGuard(FirebaseAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { user_id: 'abc123', roles: ['patient', 'physician'] };
          return true;
        },
      })
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    spyService = moduleRef.get<AuthService>(AuthService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('Test for user endpoints', () => {
    it('controller should be defined', () => {
      expect(authController).toBeDefined();
    });

    it('should call login in controller', async () => {
      const body: LoginCredentialsDto = {
        email: 'user@kegeland.no',
        password: 'password',
      };
      await request(app.getHttpServer()).post('/auth/login').send(body);
      expect(spyService.login).toBeCalledWith(body);
    });

    it('should call logout in controller', async () => {
      await request(app.getHttpServer()).post('/auth/logout');
      expect(spyService.logout).toBeCalledWith('abc123');
    });

    it('should call register in controller', async () => {
      const body: RegisterCredentialsDto = {
        email: 'user@kegeland.no',
        password: 'password',
        name: { firstName: 'Bruker', lastName: 'Brukarson' },
        roles: [Role.PATIENT],
      };
      await request(app.getHttpServer()).post('/auth/register').send(body);
      expect(spyService.register).toBeCalledWith(body);
    });

    it('should return 400 for too short password', async () => {
      const body: RegisterCredentialsDto = {
        email: 'user@kegeland.no',
        password: 'pp',
        name: { firstName: 'Bruker', lastName: 'Brukarson' },
        roles: [Role.PATIENT],
      };
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(body)
        .expect(400);
    });

    it('should return 400 for missing fields', async () => {
      const body: any = {
        email: 'user@kegeland.no',
        name: { firstName: 'Bruker', lastName: 'Brukarson' },
        roles: [Role.PATIENT],
      };
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(body)
        .expect(400);
    });

    it('should call resetPassword in controller', async () => {
      const body: ResetPasswordDto = {
        email: 'user@kegeland.no',
      };
      await request(app.getHttpServer()).post('/auth/reset').send(body);

      expect(spyService.resetPassword).toBeCalledWith(body);
    });

    it('should call refresh in controller', async () => {
      const body: RefreshTokenDto = {
        refreshToken: 'token',
      };
      await request(app.getHttpServer()).post('/auth/refresh').send(body);

      expect(spyService.refresh).toBeCalledWith(body);
    });
  });
});
