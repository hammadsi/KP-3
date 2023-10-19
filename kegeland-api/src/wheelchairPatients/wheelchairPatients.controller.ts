import { Controller, Get, Param, UseGuards, Body, Put, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { WheelchairPatientsService } from './wheelchairPatients.service';
import { UpdatePhysicalStateDto } from './dto/update-physicalstate.dto';
import { NewGameSessionDto } from './dto/new-game-session.dto';

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

  /**
   * Endpoint for updating patientData
   * @param id of patient
   * @param patientData data to be updated
   * @returns updated data
   */
  @Put(':id')
  async updatePatientData(
    @Param('id') id: string,
    @Body() data: UpdatePhysicalStateDto,
  ) {
    return this.wheelchairPatientsService.updateWheelchairPatientData(id, data);
  }
  
  /**
   * Endpoint for adding a game session
   * @param id of patient
   * @param gameSession data of a game session to add
   * @returns the ID and data of the newly added game session
   */
  @Post(':id/gameSessions')
  async addGameSession(
    @Param('id') id: string,
    @Body() gameSession: NewGameSessionDto,
  ) {
    return this.wheelchairPatientsService.addGameSessionToPatient(id, gameSession);
  }
}

