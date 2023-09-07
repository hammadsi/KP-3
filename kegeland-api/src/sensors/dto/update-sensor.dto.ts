import { Transform } from 'class-transformer';
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class UpdateSensorDto {
  @IsOptional()
  @IsString()
  @Transform((value) => value.value.toLowerCase())
  name?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  labels?: string[];
}
