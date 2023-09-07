import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class Sensor {
  @IsString()
  @Transform((value) => value.value.toLowerCase())
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  labels: string[];
}
