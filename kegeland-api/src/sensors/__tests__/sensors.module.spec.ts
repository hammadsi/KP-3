import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import { SensorsController } from '../sensors.controller';
import { SensorsService } from '../sensors.service';

describe('SensorsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [SensorsService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(SensorsController)).toBeInstanceOf(SensorsController);
    expect(module.get(SensorsService)).toBeInstanceOf(SensorsService);
  });
});
