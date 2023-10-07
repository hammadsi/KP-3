import { Expose, Type } from 'class-transformer';
import { 
  IsNumber, 
  IsString, 
  IsArray, 
  ValidateNested, 
  IsDate, 
  IsOptional, 
  IsEnum 
} from 'class-validator';

enum Gender {
  M = 'M',
  F = 'F',
  O = 'O'
}

class CurrentPhysicalState {
  @Expose()
  @IsNumber()
  height: number;

  @Expose()
  @IsNumber()
  weight: number;

  @Expose()
  @IsNumber()
  maxHeartRate: number;

  @Expose()
  @IsNumber()
  averageHeartRate: number;

  @Expose()
  @IsNumber()
  maxWheelchairSpeed: number;

  @Expose()
  @IsNumber()
  averageWheelchairSpeed: number;
}

class Question {
  @Expose()
  @IsString()
  question: string;

  @Expose()
  @IsString()
  answer: string;
}

class Lap {
  @Expose()
  @IsNumber()
  lapTime: number;

  @Expose()
  @IsDate()
  timeStamp: Date;
}

class HeartRate {
  @Expose()
  @IsNumber()
  heartRate: number;

  @Expose()
  @IsDate()
  timestamp: Date;
}

class Speed {
  @Expose()
  @IsNumber()
  leftSpeed: number;

  @Expose()
  @IsNumber()
  rightSpeed: number;

  @Expose()
  @IsDate()
  timestamp: Date;
}

class GameSession {
  @Expose()
  @IsString()
  sessionId: string;

  @Expose()
  @IsDate()
  startTime: Date;

  @Expose()
  @IsDate()
  endTime: Date;

  @Expose()
  @IsNumber()
  exerciseTime: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Question)
  preGame: Question[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Question)
  postGame: Question[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Lap)
  laps: Lap[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeartRate)
  heartRates: HeartRate[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Speed)
  speeds: Speed[];
}

export class WheelchairPatientEntity {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  age: number;

  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @Expose()
  @ValidateNested()
  @Type(() => CurrentPhysicalState)
  currentPhysicalState: CurrentPhysicalState;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GameSession)
  gameSessions: GameSession[];

  constructor(partial: Partial<WheelchairPatientEntity>) {
    Object.assign(this, partial);
  }
}