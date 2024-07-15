import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: [
      { product_id: 1, quantity: 2 },
      { product_id: 3, quantity: 4 },
    ],
  })
  @IsArray()
  product: Array<{
    product_id: number;
    quantity: number;
  }>;
}
