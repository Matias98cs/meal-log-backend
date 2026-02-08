import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateIngredientDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre es muy corto' })
  @MaxLength(50, { message: 'El nombre es muy largo' })
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @IsString({ message: 'La categoría debe ser un texto' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim().toLowerCase())
  categoria_ing?: string;
}
