import { Injectable, NotFoundException } from '@nestjs/common';
import { TCreateDeskRequest } from 'src/libs/entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async createTable(payload: TCreateDeskRequest) {
    const { name, desc, detail } = payload;

    try {
      const table = await this.prisma.desk.create({
        data: {
          name,
          desc,
          detail,
        },
      });

      return {
        message: 'Success',
        data: table,
      };
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }

  async getTables() {
    try {
      const desk = await this.prisma.desk.findMany({});

      return {
        message: 'Success',
        data: desk,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async getTable(id: number) {
    try {
      const data = await this.prisma.desk.findUnique({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
        data,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan',
        error: error.message,
      };
    }
  }

  async updateTable(id: number, payload: TCreateDeskRequest) {
    try {
      const exist = await this.prisma.desk.findFirst({
        where: {
          id,
        },
      });

      if (exist) {
        throw new NotFoundException('Data Tidak Ditemukan!');
      }
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async deleteTable(id: number) {
    try {
      await this.prisma.desk.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }
}
