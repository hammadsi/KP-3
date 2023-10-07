import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { WheelchairPatientsService } from './wheelchairPatients.service';
  
  @ApiTags('WheelchairPatients')
  @Controller('wheelchairPatients')
  @ApiBearerAuth('access-token')
  @Roles(Role.PATIENT, Role.PHYSICIAN,)
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  export class WheelchairPatientsController {
    constructor(private readonly wheelchairPatientsService: WheelchairPatientsService) {}
      /**
   * Endpoint for fetching one patient by its ID
   * @param id of patient
   * @returns patient object
   */
    @Get(':id')
    async findWheelchairPatientById(@Param('id') id: string) {
        return this.wheelchairPatientsService.findWheelchairPatientById(id);
    }
  }
  