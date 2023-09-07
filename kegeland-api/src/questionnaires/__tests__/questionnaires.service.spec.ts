import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Sensor } from 'src/enums/sensor.enum';
import { timestamp } from 'src/utils/timestamp';
import { FirebaseMock, adminMock } from 'src/__mocks__';

import { QuestionnairesService } from '../questionnaires.service';
import { QuestionnairesController } from '../questionnaires.controller';
import { AssignQuestionnaireDto } from '../dto/assign-questionnaire.dto';
import { CreateQuestionnaireDto } from '../dto/create-questionnaire.dto';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';

describe('Sessions', () => {
  let app: INestApplication;
  let questionnairesService: QuestionnairesService;
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
      controllers: [QuestionnairesController],
      providers: [QuestionnairesService, ApiServiceProvider],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    spyService = moduleRef.get<FirebaseService>(FirebaseService);
    questionnairesService = moduleRef.get<QuestionnairesService>(
      QuestionnairesService,
    );
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    await app.init();
  });

  describe('user service tests', () => {
    it(`assignQuestionnaire`, async () => {
      const data: AssignQuestionnaireDto = {
        userId: '_id',
        sensor: Sensor.FEMFIT,
        questionnaireId: '1',
      };
      const res = await questionnairesService.assignQuestionnaire(data);
      expect(res).toStrictEqual(data);
    });
    it(`findAllQuestionnaires`, async () => {
      const res = await questionnairesService.findAllQuestionnaires({
        sensor: Sensor.FEMFIT,
      });
      const expectedRes = [
        {
          id: '_id',
          name: 'Test quest',
          questions: [{ maxVal: 'Very', minVal: 'Not', question: 'How?' }],
          sensor: 'femfit',
        },
      ];
      expect(res).toStrictEqual(expectedRes);
    });
    it(`findOneQuestionnaire`, async () => {
      const res = await questionnairesService.findOneQuestionnaire('_id');
      const expectedRes = {
        id: '_id',
        name: 'Test quest',
        questions: [{ maxVal: 'Very', minVal: 'Not', question: 'How?' }],
        sensor: 'femfit',
      };
      expect(res).toStrictEqual(expectedRes);
    });

    it(`createQuestionnaire`, async () => {
      const data: CreateQuestionnaireDto = {
        name: 'test',
        sensor: Sensor.FEMFIT,
        questions: [{ question: 'Q', minVal: 'A', maxVal: 'B' }],
      };
      const res = await questionnairesService.createQuestionnaire(data);
      expect(res).toStrictEqual({ id: '_id2', ...data });
    });
    it(`createAnswer`, async () => {
      const data: CreateAnswerDto = {
        userId: '_id',
        answeredAt: timestamp(),
        answers: [1, 2, 3],
        sessionId: '_id',
      };
      const res = await questionnairesService.createAnswer('_id', data);
      expect(res).toStrictEqual({ id: '_id2', ...data });
    });
    it(`updateAnswer`, async () => {
      const data: UpdateAnswerDto = {
        userId: '_id',
        answeredAt: timestamp(),
        answers: [1, 2, 3],
        sessionId: '_id',
      };
      const res = await questionnairesService.updateAnswer('_id', '_id', data);
      expect(res).toStrictEqual({ id: '_id', ...data });
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
