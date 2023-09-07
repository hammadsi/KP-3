import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseMock, adminMock, dbMock } from 'src/__mocks__';

import { SensorsService } from '../sensors.service';
import { SensorsController } from '../sensors.controller';
import { CreateSensorDto } from '../dto/create-sensor.dto';
import { UpdateSensorDto } from '../dto/update-sensor.dto';

describe('Sessions', () => {
  let app: INestApplication;
  let sensorsService: SensorsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spyService: FirebaseService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: FirebaseService,
      useFactory: () => ({
        firestore: new FirebaseMock(),
        firebaseAdmin: { ...adminMock },
      }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [SensorsService, ApiServiceProvider],
    }).compile();

    spyService = moduleRef.get<FirebaseService>(FirebaseService);
    sensorsService = moduleRef.get<SensorsService>(SensorsService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    await app.init();
  });

  describe('user service tests', () => {
    it(`findOne`, async () => {
      const res = await sensorsService.findOne('_id');
      expect(res).toStrictEqual({ id: '_id', ...dbMock.sensors[0] });
    });
    it(`findAll`, async () => {
      const res = await sensorsService.findAll();
      const expectedRes = [
        {
          id: '_id',
          labels: ['HR', 'Speed', 'Altitude'],
          name: 'empatica',
        },
      ];
      expect(res).toStrictEqual(expectedRes);
    });
    it(`create`, async () => {
      const input: CreateSensorDto = {
        name: 'femfit',
        labels: ['Speed', 'Altitude'],
      };
      const res = await sensorsService.create(input);
      const expectedRes = {
        id: 'femfit',
        name: 'femfit',
        labels: ['Speed', 'Altitude'],
      };
      expect(res).toStrictEqual(expectedRes);
    });
    it(`update`, async () => {
      const updateData: UpdateSensorDto = {
        labels: ['HR', 'Speed'],
      };
      const res = await sensorsService.update('empatica', updateData);
      const expectedRes = {
        id: 'empatica',
        labels: ['HR', 'Speed'],
      };
      expect(res).toStrictEqual(expectedRes);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
