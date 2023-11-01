import {
  Controller,
  Get,
  Param,
  UseGuards,
  Body,
  Put,
  Post,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

import { Role } from '../roles/enums/role.enum';

import { Roles } from '../roles/roles.decorator';

import { RolesGuard } from '../roles/roles.guard';

import { WheelchairPatientsService } from './wheelchairPatients.service';

import { UpdatePhysicalStateDto } from './dto/update-physicalstate.dto';
import { HeartRateDto, LapDto, SpeedDto, UpdateGameSessionDto } from './dto/update-game-session.dto';

@ApiTags('WheelchairPatients')

@Controller('wheelchairPatients')

@ApiBearerAuth('access-token')

@Roles(Role.PATIENT, Role.PHYSICIAN)

@UseGuards(FirebaseAuthGuard, RolesGuard)

export class WheelchairPatientsController {

  constructor(

    private readonly wheelchairPatientsService: WheelchairPatientsService,

  ) {}

  /**

   * Endpoint for fetching one patient by its ID

   * @param id of patient

   * @returns patient object

   */

  @Get(':id')

  async findWheelchairPatientById(@Param('id') id: string) {

    return this.wheelchairPatientsService.findWheelchairPatientById(id);

  }



  @Post(':patientId/gameSessions/:sessionId/heartRate')

  async addHeartRateToGameSession(

    @Param('patientId') patientId: string,

    @Param('sessionId') sessionId: string,

    @Body() heartRateData: HeartRateDto,

  ) {
    return this.wheelchairPatientsService.addHeartRateToGameSession(
      patientId,
      sessionId,
      heartRateData,
    );

  }

  @Post(':patientId/gameSessions/:sessionId/heartRate')
  async addHeartRateToGameSession(
    @Param('patientId') patientId: string,
    @Param('sessionId') sessionId: string,
    @Body() heartRateData: HeartRateDto,
  ) {
    return this.wheelchairPatientsService.addHeartRateToGameSession(patientId, sessionId, heartRateData);
  }

  @Post(':patientId/gameSessions/:sessionId/speed')
  async addSpeedToGameSession(
    @Param('patientId') patientId: string,
    @Param('sessionId') sessionId: string,
    @Body() speedData: SpeedDto,
  ) {
    return this.wheelchairPatientsService.addSpeedToGameSession(patientId, sessionId, speedData);
  }

  @Post(':patientId/gameSessions/:sessionId/lap')
  async addLapToGameSession(
    @Param('patientId') patientId: string,
    @Param('sessionId') sessionId: string,
    @Body() lapData: LapDto,
  ) {
    return this.wheelchairPatientsService.addLapToGameSession(patientId, sessionId, lapData);
  }
}

