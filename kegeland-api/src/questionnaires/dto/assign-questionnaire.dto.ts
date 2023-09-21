import { IsEnum, IsString } from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export class AssignQuestionnaireDto {
  @IsString()
  userId: string;

  @IsString()
  questionnaireId: string;

  @IsEnum(Sensor, { each: true })
  sensor: Sensor;
}
