import * as request from 'supertest';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { Sensor } from 'src/enums/sensor.enum';
import { questionnairesServiceMock } from 'src/__mocks__';

import { QuestionnairesService } from '../questionnaires.service';
import { QuestionnairesController } from '../questionnaires.controller';
import { AssignQuestionnaireDto } from '../dto/assign-questionnaire.dto';
import { UpdateQuestionnaireDto } from '../dto/update-questionnaire.dto';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';

describe('QuestionnairesController', () => {
  let questionnairesController: QuestionnairesController;
  let spyService: QuestionnairesService;
  let app: INestApplication;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: QuestionnairesService,
      useFactory: () => ({ ...questionnairesServiceMock }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnairesController],
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

    questionnairesController = moduleRef.get<QuestionnairesController>(
      QuestionnairesController,
    );
    spyService = moduleRef.get<QuestionnairesService>(QuestionnairesService);
    app = moduleRef.createNestApplication({ cors: { origin: '*' } });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('Test for user endpoints', () => {
    it('controller should be defined', () => {
      expect(questionnairesController).toBeDefined();
    });

    it('should call assignQuestionnaire in controller', async () => {
      const body: AssignQuestionnaireDto = {
        userId: '1234',
        questionnaireId: '4321',
        sensor: Sensor.FEMFIT,
      };

      await request(app.getHttpServer())
        .post('/questionnaires/assignments')
        .send(body);

      expect(spyService.assignQuestionnaire).toBeCalledWith(body);
    });

    it('should call getAssignedQuestionnaire in controller', async () => {
      await request(app.getHttpServer()).get(
        '/questionnaires/assignments/1?sensor=femfit',
      );
      expect(spyService.getAssignedQuestionnaire).toHaveBeenCalledWith('1', {
        sensor: 'femfit',
      });
    });

    it('should call findAllQuestionnaires in controller', async () => {
      await request(app.getHttpServer()).get('/questionnaires?sensor=femfit');
      expect(spyService.findAllQuestionnaires).toHaveBeenCalledWith({
        sensor: 'femfit',
      });
    });

    it('should call findOneQuestionnaire in controller', async () => {
      await request(app.getHttpServer()).get('/questionnaires/1');
      expect(spyService.findOneQuestionnaire).toHaveBeenCalledWith('1');
    });

    it('should call updateQuestionnaire in controller', async () => {
      const body: UpdateQuestionnaireDto = {
        name: 'rename questionnaire',
        sensor: Sensor.FEMFIT,
      };

      await request(app.getHttpServer()).put('/questionnaires/1').send(body);

      expect(spyService.updateQuestionnaire).toBeCalledWith('1', body);
    });

    it('should call delete in controller', async () => {
      await request(app.getHttpServer()).delete('/questionnaires/1');
      expect(spyService.deleteQuestionnaire).toHaveBeenCalledWith('1');
    });

    it('should call findAllAnswers in controller', async () => {
      await request(app.getHttpServer()).get(
        '/questionnaires/1/answers?userId=1234',
      );
      expect(spyService.findAllAnswers).toHaveBeenCalledWith('1', {
        userId: '1234',
      });

      await request(app.getHttpServer()).get(
        '/questionnaires/2/answers?sessionId=1234',
      );
      expect(spyService.findAllAnswers).toHaveBeenCalledWith('2', {
        sessionId: '1234',
      });
    });

    it('should call findOneAnswer in controller', async () => {
      await request(app.getHttpServer()).get('/questionnaires/1/answers/2');
      expect(spyService.getAnswer).toHaveBeenCalledWith('1', '2');
    });

    it('should call createAnswer in controller', async () => {
      const body: CreateAnswerDto = {
        userId: '1234',
        sessionId: '5678',
        answeredAt: 1234,
        answers: [1, 2, 3, 4],
      };
      await request(app.getHttpServer())
        .post('/questionnaires/1/answers')
        .send(body);
      expect(spyService.createAnswer).toBeCalledWith('1', body);
    });

    it('should call updateAnswer in controller', async () => {
      const updateBody: UpdateAnswerDto = {
        userId: '1234',
        sessionId: '5678',
        answeredAt: 1234,
      };

      await request(app.getHttpServer())
        .put('/questionnaires/1/answers/2')
        .send(updateBody);

      expect(spyService.updateAnswer).toBeCalledWith('1', '2', updateBody);
    });

    it('should remove unvalidField when updateAnswer is called in controller', async () => {
      const invalidBody: any = {
        userId: '1234',
        sessionId: '5678',
        answeredAt: 1234,
        invalidField: 'not valid field',
      };

      await request(app.getHttpServer())
        .put('/questionnaires/1/answers/2')
        .send(invalidBody);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { invalidField, ...rest } = invalidBody;
      expect(spyService.updateAnswer).toBeCalledWith('1', '2', rest);
    });

    it('should call delete in controller', async () => {
      await request(app.getHttpServer()).delete('/questionnaires/1/answers/2');
      expect(spyService.deleteAnswer).toHaveBeenCalledWith('1', '2');
    });
  });
});
