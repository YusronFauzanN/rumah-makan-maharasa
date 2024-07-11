import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from 'src/libs/entities';

export class UpdateProductDto {
  @ApiProperty({ example: 'Kangkung' })
  @IsString()
  @IsOptional()
  product_name?: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Kangkung Pedas' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  @IsOptional()
  image_url?: string;
}
