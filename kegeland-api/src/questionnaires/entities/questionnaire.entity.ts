import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export class QuestionField {
  @IsString()
  question: string;
  @IsString()
  minVal: string;
  @IsString()
  maxVal: string;
}

export class Questionnaire {
  @IsString()
  name: string;

  @IsEnum(Sensor, { each: true })
  sensor: Sensor;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuestionField)
  questions: QuestionField[];
}
