import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePhysicalStateDto {
    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    maxHeartRate?: number;

    @IsOptional()
    @IsNumber()
    averageHeartRate?: number;

    @IsOptional()
    @IsNumber()
    maxWheelchairSpeed?: number;

    @IsOptional()
    @IsNumber()
    averageWheelchairSpeed?: number;

    @IsOptional()
    questionnaire?: QuestionDto[];
}

export class QuestionDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsString()
    category: string;

    @IsString()
    chronology: number;
}

