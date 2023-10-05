import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The Brand Name' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The Brand URL image' })
  readonly image: string;
}
