import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createTableDto {
  @ApiProperty({ example: 'Meja 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Dekat Sungai' })
  @IsString()
  desc: string;

  @ApiProperty({ example: 'Dekat Sungai' })
  @IsString()
  detail: string;
}
