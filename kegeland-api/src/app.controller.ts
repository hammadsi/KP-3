import { Controller, Get, UseGuards } from '@nestjs/common';
import { Redirect } from '@nestjs/common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard';
import { Role } from './roles/enums/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint for catching wildcard routes, i.e. non-existing endpoints
   */
  @Get('*')
  @Redirect('/')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirect() {}
}
