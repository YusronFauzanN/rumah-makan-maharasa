import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get('table')
  @ApiBody({ type: createTableDto })
  getTables() {
    return this.masterService.getTables();
  }

  @Get('table')
  @ApiBody({ type: createTableDto })
  findOneTable(@Param('id') id: string) {
    return this.masterService.getTable(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: TCreateDeskRequest) {
    return this.masterService.updateTable(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.deleteTable(+id);
  }
}
