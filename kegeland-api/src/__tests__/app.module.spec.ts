import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthStrategy } from '../firebase/firebase-auth.strategy';
import { UsersModule } from '../users/users.module';
import firebaseConfig from '../config/firebase.config';
import { QuestionnairesModule } from '../questionnaires/questionnaires.module';
import { SensorsModule } from '../sensors/sensors.module';
import { SessionsModule } from '../sessions/sessions.module';
import { HealthModule } from '../health/health.module';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [firebaseConfig],
        }),
        FirebaseModule,
        HealthModule,
        AuthModule,
        QuestionnairesModule,
        SensorsModule,
        SessionsModule,
        UsersModule,
      ],
      controllers: [AppController],
      providers: [AppService, FirebaseAuthStrategy],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
    expect(module.get(FirebaseModule)).toBeInstanceOf(FirebaseModule);
    expect(module.get(HealthModule)).toBeInstanceOf(HealthModule);
    expect(module.get(AuthModule)).toBeInstanceOf(AuthModule);
    expect(module.get(QuestionnairesModule)).toBeInstanceOf(
      QuestionnairesModule,
    );
    expect(module.get(SensorsModule)).toBeInstanceOf(SensorsModule);
    expect(module.get(SessionsModule)).toBeInstanceOf(SessionsModule);
    expect(module.get(UsersModule)).toBeInstanceOf(UsersModule);
    expect(module.get(AppController)).toBeInstanceOf(AppController);
    expect(module.get(AppService)).toBeInstanceOf(AppService);
    expect(module.get(FirebaseAuthStrategy)).toBeInstanceOf(
      FirebaseAuthStrategy,
    );
  });
});
