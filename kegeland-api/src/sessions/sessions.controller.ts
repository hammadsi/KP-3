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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ListSessionsDto } from './dto/list-sessions.dto';

@ApiTags('Sessions')
@Controller('sessions')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /**
   * Endpoint for fetching specific session by its ID
   * @param id of session
   * @returns Session object
   */
  @Get(':id')
  @Roles(Role.PATIENT, Role.PHYSICIAN)
  async findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  /**
   * Endpoint for fetching all sessions based on query parameters
   * @param filters query parameters passed in URL of request
   * @returns list of Session objects according to query parameters
   */
  @Get()
  @Roles(Role.PHYSICIAN)
  async findAll(@Query() filters: ListSessionsDto) {
    return this.sessionsService.findAll(filters);
  }

  /**
   * Endpoint for updating sessions object
   * @param id of session
   * @param updateSessionDto fields and data to be updated passed as body of request
   * @returns updated session object
   */
  @Put(':id')
  @Roles(Role.PATIENT)
  async update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  /**
   * Endpoint for creating session
   * @param createSessionDto data for session passed as body of request
   * @returns created session object
   */
  @Post()
  @Roles(Role.PATIENT)
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  /**
   * Endpoint for deleting session object
   * @param id id of session to be deleted
   * @returns Promise<void>
   */
  @Delete(':id')
  @Roles(Role.PATIENT, Role.PHYSICIAN)
  async delete(@Param('id') id: string) {
    return this.sessionsService.delete(id);
  }
}
