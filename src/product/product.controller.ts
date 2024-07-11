import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  TCreateProductRequest,
  TUpdateProductRequest,
} from 'src/libs/entities';
import { CreateProductDto } from 'src/libs/dto';
import { UpdateProductDto } from 'src/libs/dto/product/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  create(@Body() payload: TCreateProductRequest) {
    return this.productService.create(payload);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() payload: TUpdateProductRequest) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
