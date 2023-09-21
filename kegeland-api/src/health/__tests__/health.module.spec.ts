import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';

import { HealthController } from '../health.controller';

describe('HealthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [HealthController],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(TerminusModule)).toBeInstanceOf(TerminusModule);
    expect(module.get(HttpModule)).toBeInstanceOf(HttpModule);
    expect(module.get(HealthController)).toBeInstanceOf(HealthController);
  });
});
