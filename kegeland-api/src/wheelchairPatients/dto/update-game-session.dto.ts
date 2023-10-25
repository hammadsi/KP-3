import { 
    IsOptional,
    IsNumber, 
    IsString, 
    IsArray, 
    ValidateNested, 
    IsDate 
} from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;
}

class LapDto {
    @IsNumber()
    lapTime: number;

    @IsDate()
    @Type(() => Date)
    timeStamp: Date;
}

class HeartRateDto {
    @IsNumber()
    heartRate: number;

    @IsDate()
    @Type(() => Date)
    timestamp: Date;
}

class SpeedDto {
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    preGame?: QuestionDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    postGame?: QuestionDto[];

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
