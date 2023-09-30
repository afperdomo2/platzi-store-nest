import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @ApiProperty({ description: "The Brand's Name" })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ description: "The Brand's URL image" })
  readonly image: string;
}
