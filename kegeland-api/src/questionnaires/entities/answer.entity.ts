import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

export default class Answer {
  @IsString()
  userId: string;
  @IsString()
  sessionId: string;
  @IsNumber()
  answeredAt: number;
  @IsArray()
  @ArrayMinSize(1)
  answers: number[];
}
