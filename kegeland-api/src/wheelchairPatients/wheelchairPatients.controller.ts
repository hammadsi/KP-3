import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
  import { RolesGuard } from '../roles/roles.guard';
  import { WheelchairPatientsService } from './wheelchairPatients.service';
  
  @ApiTags('WheelchairPatients')
  @Controller('wheelchairPatients')
  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  export class WheelchairPatientsController {
    constructor(private readonly wheelchairPatientsService: WheelchairPatientsService) {}
      /**
   * Endpoint for fetching one patient by its ID
   * @param id of patient
   * @returns patient object
   */
    @Get('wheelchair-patients/:id')
    async findWheelchairPatientById(@Param('id') id: string) {
        return this.wheelchairPatientsService.findWheelchairPatientById(id);
    }
  }
  