import * as request from 'supertest';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { usersServiceMock } from 'src/__mocks__';

import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
  let usersController: UsersController;
  let spyService: UsersService;
  let app: INestApplication;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({ ...usersServiceMock }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [ApiServiceProvider],
    })
      .overrideGuard(FirebaseAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { user_id: 'abc123', roles: ['physician'] };
          return true;
        },
      })
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    spyService = moduleRef.get<UsersService>(UsersService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    await app.init();
  });

  describe('Test for user endpoints', () => {
    it('controller should be defined', () => {
      expect(usersController).toBeDefined();
    });
    it('should call findAllPatients in controller', async () => {
      await request(app.getHttpServer()).get('/users/patients');
      expect(spyService.findAllPatients).toHaveBeenCalled();
    });
    it('should call findOne in controller', async () => {
      await request(app.getHttpServer()).get('/users/1');
      expect(spyService.findOne).toBeCalledWith('1');
    });
    it('should call getPatientOverview in controller', async () => {
      await request(app.getHttpServer()).get('/users/overview/1');
      expect(spyService.getPatientOverview).toBeCalledWith('1');
    });
    it('should call delete in controller', async () => {
      await request(app.getHttpServer()).delete('/users/1');
      expect(spyService.delete).toBeCalledWith('1');
    });
  });
});
