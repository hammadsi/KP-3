import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { FirebaseProviderMock } from '../../__mocks__/firebaseMock';
import firebaseConfig from '../../config/firebase.config';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [firebaseConfig],
        }),
        HttpModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, FirebaseProviderMock],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(HttpModule)).toBeInstanceOf(HttpModule);
    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
  });
});
