import { IsEnum, IsOptional } from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export class FindQuestionnairesDto {
  @IsOptional()
  @IsEnum(Sensor, { each: true })
  sensor?: Sensor;
}
