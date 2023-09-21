import { HealthIndicatorResult } from '@nestjs/terminus';

export const goodHealthCheckMock = (metric: string): HealthIndicatorResult => ({
  [metric]: {
    status: 'up',
  },
});
