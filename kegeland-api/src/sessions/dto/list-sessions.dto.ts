import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Session } from '../entities/session.entity';

export class ListSessionsDto {
  @IsOptional()
  @IsString()
  sensor?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class SessionListItem extends OmitType(Session, ['data']) {}
