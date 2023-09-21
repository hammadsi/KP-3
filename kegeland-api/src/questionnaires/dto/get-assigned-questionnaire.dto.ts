import { IsEnum } from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export class GetAssignedQuestionnaireDto {
  @IsEnum(Sensor, { each: true })
  sensor: Sensor;
}
