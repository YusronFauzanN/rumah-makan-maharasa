import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/libs/guard';
import { TCreateOrderRequest } from 'src/libs/entities';
import { CreateOrderDto } from 'src/libs/dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateOrderDto })
  create(@Body() payload: TCreateOrderRequest) {
    return this.orderService.create(payload);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':order_number')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findOne(@Param('order_number') order_number: string) {
    return this.orderService.findOne(order_number);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() payload: TCreateOrderRequest) {
  //   return this.orderService.update(+id, payload);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
