import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(readonly prisma: PrismaService) {}

  async create(payload) {
    try {
      const customer = await this.prisma.customer.create({
        data: {
          ...payload,
        },
      });

      return {
        message: 'Success',
        data: customer,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const customer = await this.prisma.customer.findMany();
      return {
        message: 'Success',
        data: customer,
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
      const customer = await this.prisma.customer.findUnique({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
        data: customer,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async update(id: number, payload) {
    try {
      const customer = await this.prisma.customer.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return {
        message: 'Success',
        data: customer,
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
      const customer = await this.prisma.customer.delete({
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
}
