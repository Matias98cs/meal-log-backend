import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { MeasurementUnit } from '../enums/measurement-unit.enum';

export class CreateMealItemDto {
  @IsUUID()
  ingredientId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(MeasurementUnit)
  unit: MeasurementUnit;

  @IsString()
  @IsOptional()
  comment?: string;
}