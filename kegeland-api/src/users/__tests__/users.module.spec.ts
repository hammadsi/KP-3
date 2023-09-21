import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [UsersController],
      providers: [UsersService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(HttpModule)).toBeInstanceOf(HttpModule);
    expect(module.get(UsersController)).toBeInstanceOf(UsersController);
    expect(module.get(UsersService)).toBeInstanceOf(UsersService);
  });
});
