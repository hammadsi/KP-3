import { 
    IsOptional,
    IsNumber, 
    IsString, 
    IsArray, 
    ValidateNested, 
    IsDate, 
    IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionType {
    freeText = 'freeText',
    scale = 'scale',
    radio = 'radio'
}

class QuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsEnum(QuestionType)
    type: QuestionType;
}

export class LapDto {
    @IsNumber()
    lapTime: number;

    @IsDate()
    @Type(() => Date)
    timeStamp: Date;
}

export class HeartRateDto {
    @IsNumber()
    heartRate: number;

    @IsDate()
    @Type(() => Date)
    timestamp: Date;
}

export class SpeedDto {
    @IsNumber()
    leftSpeed: number;

    @IsNumber()
    rightSpeed: number;

    @IsDate()
    @Type(() => Date)
    timestamp: Date;
}

class TimeSeriesDataDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HeartRateDto)
    heartRates?: HeartRateDto[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpeedDto)
    speeds?: SpeedDto[];
  
    // Add other fields like IMUData if necessary.
  }

  export class UpdateGameSessionDto {
    @IsOptional()
    @IsNumber()
    createdAt?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startTime?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endTime?: Date;

    @IsOptional()
    @IsNumber()
    exerciseTime?: number;

    @IsOptional()
    questionnaires?: {
      preGame: QuestionDto[];
      postGame: QuestionDto[];
    };

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LapDto)
    laps?: LapDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => TimeSeriesDataDto)
    timeSeriesData?: TimeSeriesDataDto;
}

