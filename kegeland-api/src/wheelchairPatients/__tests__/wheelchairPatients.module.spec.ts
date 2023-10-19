import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import { WheelchairPatientsController } from '../wheelchairPatients.controller';
import { WheelchairPatientsService } from '../wheelchairPatients.service';

describe('WheelchairPatientsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [WheelchairPatientsController],
      providers: [WheelchairPatientsService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(HttpModule)).toBeInstanceOf(HttpModule);
    expect(module.get(WheelchairPatientsController)).toBeInstanceOf(WheelchairPatientsController);
    expect(module.get(WheelchairPatientsService)).toBeInstanceOf(WheelchairPatientsService);
  });
});
