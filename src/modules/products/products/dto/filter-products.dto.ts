import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf(({ minPrice }) => minPrice)
  @IsPositive()
  maxPrice: number;
}
