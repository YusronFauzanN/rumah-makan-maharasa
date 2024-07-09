import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'John@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: '19-12-2024' })
  @IsString()
  reservation_date: string;

  @ApiProperty({ example: '19.00' })
  @IsString()
  reservation_time: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  number_of_people: number;

  @ApiProperty({ example: 'Acara Keluarga' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  desk_id: number;
}
