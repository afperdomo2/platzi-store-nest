/**
 * Los Data Transfer Objects (DTO) se utilizan en NestJS para representar los datos
 * que se transmiten entre las capas de la aplicación.
 *
 * Los DTO son objetos simples que tienen solo los datos que son necesarios para una
 * tarea específica.
 */
export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly image: string;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
}
