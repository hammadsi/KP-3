import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

export default class Answer {
  @IsString()
  userId: string;
  @IsString()
  id: string;
  @IsNumber()
  answeredAt: number;
  @IsArray()
  @ArrayMinSize(1)
  answers: number[];
}
