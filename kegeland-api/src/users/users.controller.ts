import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(Role.PHYSICIAN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint for fetching all patients
   * @returns all patients in database
   */
  @Get('patients')
  async findAllPatients() {
    return this.usersService.findAllPatients();
  }

  /**
   * Endpoint for fetching specific user
   * @param id
   * @returns UserDetails object
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Endpoint for fetching workout summary for patient
   * @param id of user
   * @returns object with full name of patient and list of all session dates for user
   */
  @Get('overview/:id')
  async getPatientOverview(@Param('id') id: string) {
    return this.usersService.getPatientOverview(id);
  }

  /**
   * Endpoint for deleting user by its ID
   * @param id deletes user
   * @returns Promise<void>
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
