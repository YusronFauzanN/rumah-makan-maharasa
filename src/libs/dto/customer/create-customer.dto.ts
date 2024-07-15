import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'John@example.com' })
  @IsString()
  @IsEmail()
  email: string;
}
