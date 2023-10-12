import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseMock, adminMock, dbMock } from 'src/__mocks__';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('Users', () => {
  let app: INestApplication;
  let usersService: UsersService;
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
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    spyService = moduleRef.get<FirebaseService>(FirebaseService);
    usersService = moduleRef.get<UsersService>(UsersService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    await app.init();
  });

  describe('user service tests', () => {
    it(`findOne`, async () => {
      const res = await usersService.findOne('_id');
      expect(res).toStrictEqual(dbMock.userDetails[0]);
    });
    it(`findAllPatients`, async () => {
      const res = await usersService.findAllPatients();
      expect(res).toStrictEqual(dbMock.userDetails);
    });
    it(`getPatientOverview`, async () => {
      const res = await usersService.getPatientOverview('_id');
      const expectedRes = {
        name: 'Arne-Bente Arnhildsson',
        sessionDates: [new Date(null)],
      };
      expect(res).toStrictEqual(expectedRes);
    });
    it(`delete`, async () => {
      await usersService.delete('_id');
      expect(spyService.firebaseAdmin.auth).toHaveBeenCalled();
    });
    it(`findWheelchairPatientById`, async () => {
      // Assuming you've created a mock to simulate Firestore response
      const mockPatient = { id: 'GCvmwnERnr0NZSnomuMe', name: 'William'};

      // Mock Firestore response
      jest.spyOn(spyService.firestore.collection('patients').doc(mockPatient.id), 'get').mockResolvedValue({
        exists: true,
        data: () => mockPatient,
        id: mockPatient.id
      } as any);  // using 'as any' to avoid typing issues in mock

      const res = await usersService.findWheelchairPatientById(mockPatient.id);
      
      expect(res).toStrictEqual(mockPatient);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
