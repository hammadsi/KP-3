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

export enum Gender {
  M = 'M',
  F = 'F',
  O = 'O'
}

export enum QuestionType {
  freeText = 'freeText',
  scale = 'scale',
  radio = 'radio'
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

  @Expose()
  @IsEnum(QuestionType)
  type: QuestionType;
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
export class TimeSeriesData {
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

  // Add any other fields like IMUData if necessary
}

export class GameSession {
  @Expose()
  @IsString()
  id: string;

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
  @IsOptional()
  questionnaires?: {
    preGame: Question[];
    postGame: Question[];
  };

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Lap)
  laps: Lap[];

  @Expose()
  @ValidateNested()
  @Type(() => TimeSeriesData)
  timeSeriesData: TimeSeriesData;
}

export class WheelchairPatientEntity {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  birthdate: string;

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