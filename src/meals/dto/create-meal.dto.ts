import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { MealCategory } from '../enums/meal-category.enum';
import { CreateMealItemDto } from './create-meal-item.dto';
import { Type } from 'class-transformer';

export class CreateMealDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsIn([MealCategory.DESAYUNO, MealCategory.ALMUERZO, MealCategory.MERIENDA, MealCategory.CENA, MealCategory.SNACK])
    category: MealCategory;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMealItemDto)
    items?: CreateMealItemDto[];
}
