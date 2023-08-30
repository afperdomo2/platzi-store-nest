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
