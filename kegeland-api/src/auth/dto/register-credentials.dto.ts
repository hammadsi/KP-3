import { Type } from 'class-transformer';
import { IsEnum, IsOptional, MinLength, ValidateNested } from 'class-validator';

import { Role } from '../../roles/enums/role.enum';
import { FullName } from '../entities/user-details.entity';

import { LoginCredentialsDto } from './login-credentials.dto';

export class RegisterCredentialsDto extends LoginCredentialsDto {
  @MinLength(6)
  password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FullName)
  name?: FullName;

  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}
