import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { UsersModule } from './users/users.module';
import firebaseConfig from './config/firebase.config';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { SensorsModule } from './sensors/sensors.module';
import { SessionsModule } from './sessions/sessions.module';
import { HealthModule } from './health/health.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      renderPath: '',
    }),
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
})
export class AppModule {}
