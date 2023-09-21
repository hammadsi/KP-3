import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { Role } from '../../roles/enums/role.enum';

export class FullName {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;
}

export class UserDetailsEntity {
  @Expose()
  @Type(() => FullName)
  name: FullName;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];

  constructor(partial: Partial<UserDetailsEntity>) {
    Object.assign(this, partial);
  }
}
