import { Injectable } from '@nestjs/common';
import {
  TCreateProductRequest,
  TUpdateProductRequest,
} from 'src/libs/entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(readonly prisma: PrismaService) {}
  async create(payload: TCreateProductRequest) {
    try {
      const product = await this.prisma.product.create({
        data: {
          ...payload,
        },
      });

      return {
        message: 'Success',
        data: product,
      };
    } catch (error) {
      return {
        message: 'Failed',
        error: error,
      };
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({});

      return {
        message: 'Success',
        data: products,
      };
    } catch (error) {
      return {
        message: 'Failed',
        error: error,
      };
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
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
        message: 'Failed',
        error: error,
      };
    }
  }

  async update(id: number, payload: TUpdateProductRequest) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return {
        message: 'Success',
        data: product,
      };
    } catch (error) {
      return {
        message: 'Failed',
        error: error,
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
        message: 'Failed',
        error: error,
      };
    }
  }
}
