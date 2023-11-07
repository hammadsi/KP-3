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
import { isString } from 'lodash';

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
}

class IMUReadingDto {
    @IsNumber()
    x: number;
  
    @IsNumber()
    y: number;
  
    @IsNumber()
    z: number;
}
  
export class IMUDataDto {
@IsNumber()
timestamp: number;

@ValidateNested()
@Type(() => IMUReadingDto)
accelerometer: IMUReadingDto;

@ValidateNested()
@Type(() => IMUReadingDto)
gyroscope: IMUReadingDto;
}
  

export class LapDto {
    @IsNumber()
    lapTime: number;

    @IsDate()
    @Type(() => Date)
    timestamp: Date;
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

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IMUDataDto)
    IMUData?: IMUDataDto[];
}

