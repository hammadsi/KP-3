import {
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsNumber()
  answeredAt?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  answers?: number[];
}
