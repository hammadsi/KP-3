import { IsNumber, IsOptional } from "class-validator";

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
}