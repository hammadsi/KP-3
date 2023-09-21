import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  sensor?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, number[]>;
}
