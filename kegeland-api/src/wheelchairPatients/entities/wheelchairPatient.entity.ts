import { Expose, Type } from 'class-transformer';
import { IsNumber, IsObject, IsString } from 'class-validator';


export class WheelchairPatientEntity {
  @Expose()
  id: string;
  /**
   * @example 'ola.nordmann@gmail.com'
   */
  @Expose()
  @IsString()
  name: string;


  constructor(partial: Partial<WheelchairPatientEntity>) {
    Object.assign(this, partial);
  }
}
