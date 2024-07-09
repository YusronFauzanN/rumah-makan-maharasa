import { Body, Controller, Post } from '@nestjs/common';
import { MasterService } from './master.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TCreateDeskRequest } from 'src/libs/entities';
import { createTableDto } from 'src/libs/dto/master/create-table.dto';
@ApiTags('Master')
@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post('table')
  @ApiBody({ type: createTableDto })
  createTable(@Body() payload: TCreateDeskRequest) {
    return this.masterService.createTable(payload);
  }
}
