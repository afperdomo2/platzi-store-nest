/**
 * Los Data Transfer Objects (DTO) se utilizan en NestJS para representar los datos
 * que se transmiten entre las capas de la aplicación.
 *
 * Los DTO son objetos simples que tienen solo los datos que son necesarios para una
 * tarea específica.
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product description' })
  readonly description: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product price' })
  readonly price: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product stock' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product URL image' })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The Brand Id' })
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'The Categories Ids' })
  readonly categoriesIds: number[];
}
