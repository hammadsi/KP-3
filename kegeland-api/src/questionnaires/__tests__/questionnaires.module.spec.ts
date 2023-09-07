import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import { QuestionnairesController } from '../questionnaires.controller';
import { QuestionnairesService } from '../questionnaires.service';

describe('QuestionnairesModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [QuestionnairesController],
      providers: [QuestionnairesService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(QuestionnairesController)).toBeInstanceOf(
      QuestionnairesController,
    );
    expect(module.get(QuestionnairesService)).toBeInstanceOf(
      QuestionnairesService,
    );
  });
});
