import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginatedPokemonsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page debe ser un número entero' })
  @Min(1, { message: 'Page debe ser mayor a 0' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit debe ser un número entero' })
  @Min(1, { message: 'Limit debe ser mayor a 0' })
  limit?: number = 10;

  @IsOptional()
  @IsString({ message: 'Search debe ser un string' })
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsString({ message: 'Type debe ser un string' })
  @Transform(({ value }) => value?.trim())
  type?: string;
}