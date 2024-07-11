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
import { CreateCategoryDto } from 'src/libs/dto';
import { TCreateCategoryRequest } from 'src/libs/entities/types/category';
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

  @Patch('table/:id')
  updateTable(@Param('id') id: string, @Body() payload: TCreateDeskRequest) {
    return this.masterService.updateTable(+id, payload);
  }

  @Delete('table/:id')
  removeTable(@Param('id') id: string) {
    return this.masterService.deleteTable(+id);
  }

  @Get('category')
  getCategories() {
    return this.masterService.getCategories();
  }

  @Get('category/:id')
  getCategory(@Param() id: string) {
    return this.masterService.getCategory(+id);
  }

  @Post('category')
  @ApiBody({ type: CreateCategoryDto })
  createCategory(@Body() payload: TCreateCategoryRequest) {
    return this.masterService.createCategory(payload);
  }

  @Patch('category/:id')
  updateCategory(@Param() id: string, @Body() payload) {
    return this.masterService.updateCategory(+id, payload);
  }

  @Delete('category')
  deleteCategory(@Param() id: string) {
    return this.masterService.deleteCategory(+id);
  }
}
