import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { PatientType, Role } from '../../roles/enums/role.enum';

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

  @Expose()
  @IsEnum(PatientType, { each: true })
  readonly patientType: PatientType[];

  constructor(partial: Partial<UserDetailsEntity>) {
    Object.assign(this, partial);
  }
}
