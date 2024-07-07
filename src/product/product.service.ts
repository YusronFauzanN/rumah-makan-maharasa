import { Injectable } from '@nestjs/common';
import {
  TCreateProductRequest,
  TCreateProductResponse,
  TDeleteBatchProductRequest,
  TGetProductResponse,
} from 'src/libs/entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    payload: TCreateProductRequest,
  ): Promise<TCreateProductResponse> {
    try {
      const {
        product_name,
        price,
        equity,
        desc,
        status,
        category_id,
        image_url,
      } = payload;

      const is_ready = status == '1' ? true : false;

      await this.prisma.product.create({
        data: {
          product_name,
          price,
          equity,
          is_ready,
          desc,
          category_id,
          image_url,
        },
      });

      return {
        message: 'Success',
        id: 1,
        product_name,
        desc,
        is_ready,
        price,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<TGetProductResponse> {
    try {
      const products = await this.prisma.product.findMany({
        orderBy: {
          id: 'desc',
        },
      });

      return {
        message: 'Success',
        data: products,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findMany({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
        data: product,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async update(
    id: number,
    payload: TCreateProductRequest,
  ): Promise<TCreateProductResponse> {
    try {
      const {
        product_name,
        price,
        equity,
        desc,
        status,
        category_id,
        image_url,
      } = payload;

      const is_ready = status == '1' ? true : false;

      await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          product_name,
          is_ready,
          price,
          equity,
          desc,
          category_id,
          image_url,
        },
      });
      return {
        message: 'Success',
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async deleteBatch(payload: TDeleteBatchProductRequest) {
    try {
      await this.prisma.product.deleteMany({
        where: {
          id: {
            in: payload.data,
          },
        },
      });

      return {
        message: 'Success',
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }
}
