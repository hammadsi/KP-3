import { Module } from '@nestjs/common';

import { WheelchairPatientsService } from './wheelchairPatients.service';
import { WheelchairPatientsController } from './wheelchairPatients.controller';

@Module({
  imports: [],
  controllers: [WheelchairPatientsController],
  providers: [WheelchairPatientsService],
})

export class WheelchairPatientsModule {}
