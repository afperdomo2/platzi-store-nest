/**
 * Los Data Transfer Objects (DTO) se utilizan en NestJS para representar los datos
 * que se transmiten entre las capas de la aplicación.
 *
 * Los DTO son objetos simples que tienen solo los datos que son necesarios para una
 * tarea específica.
 */
import {
  IsString,
  IsUrl,
  IsPositive,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsInt()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

/**
 * PartialType(CreateProductDto) crea un tipo parcial basado en la clase CreateProductDto,
 * lo que significa que UpdateProductDto solo necesita proporcionar los campos que se desean
 * actualizar en un producto en lugar de repetir todos los campos de CreateProductDto.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
