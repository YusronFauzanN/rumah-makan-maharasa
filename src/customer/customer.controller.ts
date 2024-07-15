import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/libs/dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  create(@Body() payload) {
    return this.customerService.create(payload);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCustomerDto })
  update(@Param('id') id: string, @Body() payload) {
    return this.customerService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
