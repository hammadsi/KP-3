import { 
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
    timeStamp: Date;
  }
  
  class HeartRateDto {
    @IsNumber()
    heartRate: number;
  
    @IsDate()
    timestamp: Date;
  }
  
  class SpeedDto {
    @IsNumber()
    leftSpeed: number;
  
    @IsNumber()
    rightSpeed: number;
  
    @IsDate()
    timestamp: Date;
  }
  
  export class NewGameSessionDto {
    @IsDate()
    startTime: Date;
  
    @IsDate()
    endTime: Date;
  
    @IsNumber()
    exerciseTime: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    preGame: QuestionDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    postGame: QuestionDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LapDto)
    laps: LapDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HeartRateDto)
    heartRates: HeartRateDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SpeedDto)
    speeds: SpeedDto[];
  }
  