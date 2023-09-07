import * as request from 'supertest';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { sessionsServiceMock } from 'src/__mocks__';

import { SessionsService } from '../sessions.service';
import { SessionsController } from '../sessions.controller';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { CreateSessionDto } from '../dto/create-session.dto';

describe('SessionsController', () => {
  let sessionsController: SessionsController;
  let spyService: SessionsService;
  let app: INestApplication;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: SessionsService,
      useFactory: () => ({ ...sessionsServiceMock }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
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

    sessionsController = moduleRef.get<SessionsController>(SessionsController);
    spyService = moduleRef.get<SessionsService>(SessionsService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('Test for user endpoints', () => {
    it('controller should be defined', () => {
      expect(sessionsController).toBeDefined();
    });

    it('should call findOne in controller', async () => {
      await request(app.getHttpServer()).get('/sessions/1');
      expect(spyService.findOne).toHaveBeenCalledWith('1');
    });

    it('should call findAll in controller', async () => {
      await request(app.getHttpServer()).get('/sessions');
      expect(spyService.findAll).toHaveBeenCalled();
    });

    it('should call update in controller', async () => {
      const body: UpdateSessionDto = {
        data: {
          '1234': [1, 2, 3],
        },
      };
      await request(app.getHttpServer()).put('/sessions/1').send(body);

      expect(spyService.update).toBeCalledWith('1', body);
    });

    it('should remove invalid field before calling update in controller', async () => {
      const invalidBody = {
        data: { 1234: ['1', '2', '3'] },
        invalidField: 'this field is not a part of UpdateSessionDto',
      };
      await request(app.getHttpServer()).put('/sessions/1').send(invalidBody);
      expect(spyService.update).toBeCalledWith('1', { data: invalidBody.data });
    });

    it('should call create in controller', async () => {
      const body: CreateSessionDto = {
        userId: '1234',
        data: { 1: [2, 3, 4], 2: [1, 2, 3] },
        sensor: 'femfit',
      };
      await request(app.getHttpServer()).post('/sessions').send(body);
      expect(spyService.create).toBeCalledWith(body);
    });

    it('should return 400', async () => {
      const invalidBody: any = {
        userId: '1234',
        data: 'not an object',
        sensor: 'femfit',
      };
      await request(app.getHttpServer())
        .post('/sessions')
        .send(invalidBody)
        .expect(400);
    });
    it('should call delete in controller', async () => {
      await request(app.getHttpServer()).delete('/sessions/1');
      expect(spyService.delete).toHaveBeenCalledWith('1');
    });
  });
});
