import * as request from 'supertest';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { sensorsServiceMock } from 'src/__mocks__';

import { SensorsService } from '../sensors.service';
import { SensorsController } from '../sensors.controller';
import { UpdateSensorDto } from '../dto/update-sensor.dto';
import { CreateSensorDto } from '../dto/create-sensor.dto';

describe('SessionsController', () => {
  let sensorsController: SensorsController;
  let spyService: SensorsService;
  let app: INestApplication;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: SensorsService,
      useFactory: () => ({ ...sensorsServiceMock }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
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

    sensorsController = moduleRef.get<SensorsController>(SensorsController);
    spyService = moduleRef.get<SensorsService>(SensorsService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('Test for user endpoints', () => {
    it('controller should be defined', () => {
      expect(sensorsController).toBeDefined();
    });

    it('should call findOne in controller', async () => {
      await request(app.getHttpServer()).get('/sensors/1');
      expect(spyService.findOne).toHaveBeenCalledWith('1');
    });

    it('should call findAll in controller', async () => {
      await request(app.getHttpServer()).get('/sensors');
      expect(spyService.findAll).toHaveBeenCalled();
    });

    it('should call update in controller', async () => {
      const body: UpdateSensorDto = {
        name: 'empatica',
        labels: ['H1', 'S1'],
      };
      await request(app.getHttpServer()).put('/sensors/1').send(body);

      expect(spyService.update).toBeCalledWith('1', body);
    });

    it('should remove invalidField from body', async () => {
      const invalidBody: any = {
        name: 'empatica',
        labels: ['H1', 'S1'],
        invalidField: 'this field is not valid',
      };

      await request(app.getHttpServer()).put('/sensors/1').send(invalidBody);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { invalidField, ...rest } = invalidBody;
      expect(spyService.update).toBeCalledWith('1', rest);
    });

    it('should call create in controller', async () => {
      const body: CreateSensorDto = {
        name: 'empatica',
        labels: ['H1', 'S1'],
      };
      await request(app.getHttpServer()).post('/sensors').send(body);

      expect(spyService.create).toBeCalledWith(body);
    });

    it('should call return 400 error', async () => {
      const invalidBody: any = {
        name: 'empatica',
        labels: 'not an array',
      };
      await request(app.getHttpServer())
        .post('/sensors')
        .send(invalidBody)
        .expect(400);
    });

    it('should call create in controller', async () => {
      await request(app.getHttpServer()).delete('/sensors/1');

      expect(spyService.delete).toBeCalledWith('1');
    });
  });
});
