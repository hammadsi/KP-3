import * as request from 'supertest';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { WheelchairPatientsService } from '../wheelchairPatients.service';
import { WheelchairPatientsController } from '../wheelchairPatients.controller';

// Assuming you have a wheelchairPatientsServiceMock similar to usersServiceMock
import { wheelchairPatientsServiceMock } from 'src/__mocks__/serviceMocks';

describe('WheelchairPatientsController', () => {
  let wheelchairPatientsController: WheelchairPatientsController;
  let spyService: WheelchairPatientsService;
  let app: INestApplication;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: WheelchairPatientsService,
      useFactory: () => ({ ...wheelchairPatientsServiceMock }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [WheelchairPatientsController],
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

    wheelchairPatientsController = moduleRef.get<WheelchairPatientsController>(WheelchairPatientsController);
    spyService = moduleRef.get<WheelchairPatientsService>(WheelchairPatientsService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Test for wheelchairPatients endpoints', () => {
    it('controller should be defined', () => {
      expect(wheelchairPatientsController).toBeDefined();
    });

    it('should call findWheelchairPatientById in controller', async () => {
      const patientId = '1';
      await request(app.getHttpServer()).get(`/wheelchairPatients/${patientId}`);
      expect(spyService.findWheelchairPatientById).toBeCalledWith(patientId);
    });

    // Add more test cases as per your requirements and API behavior
  });

  afterAll(async () => {
    await app.close();
  });
});
