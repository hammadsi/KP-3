import { INestApplication } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '../health.controller';

import { goodHealthCheckMock } from './mocks';

describe('HealthController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let controller: HealthController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        {
          provide: HttpHealthIndicator,
          useFactory: () => ({
            pingCheck: jest.fn(() =>
              Promise.resolve(goodHealthCheckMock('ping')),
            ),
          }),
        },
        {
          provide: DiskHealthIndicator,
          useFactory: () => ({
            checkStorage: jest.fn(() =>
              Promise.resolve(goodHealthCheckMock('storage')),
            ),
          }),
        },
        {
          provide: MemoryHealthIndicator,
          useFactory: () => ({
            checkRSS: jest.fn(() =>
              Promise.resolve(goodHealthCheckMock('memory_rss')),
            ),
            checkHeap: jest.fn(() =>
              Promise.resolve(goodHealthCheckMock('memory_heap')),
            ),
          }),
        },
      ],
    }).compile();
    controller = module.get<HealthController>(HealthController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Test health-check endpoint', () => {
    it('controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('health check should return status "OK"', async () => {
      expect(controller.check()).resolves.toBe('ok');
    });

    it('should call storageCheck from path "/" if OS is not windows', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'darwin',
      });
      const spy = jest.spyOn(controller.disk, 'checkStorage');
      await controller.check();
      expect(spy.mock.calls.length).toBeGreaterThan(0);
      const path = spy.mock.calls[0][1].path;
      expect(path).toBe('/');
    });

    it('should call storageCheck from path "C:\\" if OS is windows', async () => {
      Object.defineProperty(process, 'platform', {
        value: 'win32',
      });
      const spy = jest.spyOn(controller.disk, 'checkStorage');
      await controller.check();
      expect(spy.mock.calls.length).toBeGreaterThan(0);
      const path = spy.mock.calls[0][1].path;
      expect(path).toBe('C:\\');
    });
  });
});
