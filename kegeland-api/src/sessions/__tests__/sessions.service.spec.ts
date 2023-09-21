import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseMock, adminMock, dbMock } from 'src/__mocks__';

import { SessionsService } from '../sessions.service';
import { SessionsController } from '../sessions.controller';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

describe('Sessions', () => {
  let app: INestApplication;
  let sessionsService: SessionsService;
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
      controllers: [SessionsController],
      providers: [SessionsService, ApiServiceProvider],
    }).compile();

    spyService = moduleRef.get<FirebaseService>(FirebaseService);
    sessionsService = moduleRef.get<SessionsService>(SessionsService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    await app.init();
  });

  describe('sessions service tests', () => {
    it(`findOne`, async () => {
      const res = await sessionsService.findOne('_id');
      expect(res).toStrictEqual(dbMock.sessions[0]);
    });
    it(`findAll`, async () => {
      const res = await sessionsService.findAll({
        sensor: 'femfit',
        userId: '_id',
      });
      const expectedRes = [
        {
          createdAt: 1667810961876,
          id: '_id',
          sensor: 'femfit',
          userId: '_id',
        },
      ];
      expect(res).toStrictEqual(expectedRes);
    });
    it(`create`, async () => {
      const input: CreateSessionDto = {
        sensor: 'empatica',
        userId: '_uid',
        data: {
          1234: [1, 2, 3, 4, 5],
          2345: [2, 3, 4, 5, 6],
        },
      };
      const res = await sessionsService.create(input);
      const expectedRes = {
        id: '_id2',
        data: {
          1234: [1, 2, 3, 4, 5],
          2345: [2, 3, 4, 5, 6],
        },
        sensor: 'empatica',
        userId: '_uid',
        createdAt: res.createdAt,
      };
      expect(res).toEqual(expectedRes);
    });
    it(`update`, async () => {
      const updateData: UpdateSessionDto = {
        sensor: 'empatica',
        userId: '_id2',
      };
      const res = await sessionsService.update('_id', updateData);
      const expectedRes = {
        id: '_id',
        sensor: 'empatica',
        userId: '_id2',
      };
      expect(res).toStrictEqual(expectedRes);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
