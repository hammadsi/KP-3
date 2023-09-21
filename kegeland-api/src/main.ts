import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Kegeland API')
    .setDescription(
      'This page provides the API endpoints for NTNU Physiotherapy',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter your access-token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors({ origin: '*' });
  await app.listen(configService.get<number>('PORT') || 8000, '0.0.0.0');
}
bootstrap();
