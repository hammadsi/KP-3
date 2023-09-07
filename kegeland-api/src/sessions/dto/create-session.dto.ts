import { OmitType } from '@nestjs/swagger';

import { Session } from '../entities/session.entity';

export class CreateSessionDto extends OmitType(Session, ['id', 'createdAt']) {}
