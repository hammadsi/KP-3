import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import { SessionsController } from '../sessions.controller';
import { SessionsService } from '../sessions.service';

describe('SessionsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [SessionsController],
      providers: [SessionsService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(SessionsController)).toBeInstanceOf(SessionsController);
    expect(module.get(SessionsService)).toBeInstanceOf(SessionsService);
  });
});
