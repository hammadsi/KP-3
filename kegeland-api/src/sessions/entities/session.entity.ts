import { IsNumber, IsObject, IsString } from 'class-validator';

export class Session {
  @IsString()
  id: string;

  @IsString()
  sensor: string;

  @IsString()
  userId: string;

  @IsObject()
  data: Record<string, number[]>;

  @IsNumber()
  createdAt: number;
}
