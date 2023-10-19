import { Expose, Type } from 'class-transformer';

import { UserDetailsEntity } from './user-details.entity';
import { TokenCredentials } from './token-credentials.entity';
import { WheelchairPatientEntity } from 'src/wheelchairPatients/entities/wheelchairPatient.entity';

export class UserEntity {
  @Expose()
  id: string;
  /**
   * @example 'ola.nordmann@gmail.com'
   */
  @Expose()
  email: string;

  @Expose()
  @Type(() => UserDetailsEntity)
  details: UserDetailsEntity;

  @Expose()
  @Type(() => TokenCredentials)
  tokens: TokenCredentials;

  @Expose()
  @Type(() => WheelchairPatientEntity)
  wheelchairPatient?: WheelchairPatientEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

