import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

import { QuestionField } from '../entities/questionnaire.entity';

export class UpdateQuestionnaireDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Sensor, { each: true })
  sensor?: Sensor;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuestionField)
  questions?: QuestionField[];
}
