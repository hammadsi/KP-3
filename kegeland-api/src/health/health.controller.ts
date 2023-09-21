import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  HealthCheckStatus,
} from '@nestjs/terminus';
@ApiTags('Health checks')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    public readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckStatus> {
    return this.health
      .check([
        () => this.http.pingCheck('ping', 'https://google.com'),
        () =>
          this.disk.checkStorage('storage', {
            path: process.platform === 'win32' ? 'C:\\' : '/',
            thresholdPercent: 0.5,
          }),
        () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      ])
      .then((res) => res.status)
      .catch(() => 'error');
  }
}
