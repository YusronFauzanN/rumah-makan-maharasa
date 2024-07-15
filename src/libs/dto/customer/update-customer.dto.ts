import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({ example: 'John@example.com' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
