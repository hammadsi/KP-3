import { IsOptional, IsString } from 'class-validator';

export class FindAnswersDto {
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  @IsString()
  sessionId?: string;
}
