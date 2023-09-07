import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

import { UpdateSensorDto } from './dto/update-sensor.dto';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { SensorsService } from './sensors.service';

@ApiTags('Sensors')
@Controller('sensors')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(Role.PATIENT, Role.PHYSICIAN)
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  /**
   * Endpoint for fetching specific sensor
   * @param id of sensor
   * @returns a Sensor object
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  /**
   * Endpoint for fetching all sensors in the system
   * @returns list of all Sensors in the database
   */
  @Get()
  async findAll() {
    return this.sensorsService.findAll();
  }

  /**
   * Endpoint for updating existing sensor
   * @param id of sensor
   * @param updateSensorDto fields and data to be updated passed as body in request
   * @returns updated Sensor object
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  /**
   * Endpoint for creating new sensor
   * @param createSensorDto data for new sensor passed as body in request
   * @returns the created Sensor object
   */
  @Post()
  async create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  /**
   * Endpoint for deleting sensor
   * @param id of sensor to be deleted
   * @returns Promise<void>
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sensorsService.delete(id);
  }
}
