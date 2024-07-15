import { Injectable, NotFoundException } from '@nestjs/common';
import { TCreateDeskRequest } from 'src/libs/entities';
import { TCreateCategoryRequest } from 'src/libs/entities/types/category';
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

  async createCategory(payload: TCreateCategoryRequest) {
    const { category_name } = payload;
    try {
      const category = await this.prisma.category.create({
        data: {
          category_name: category_name,
        },
      });

      return {
        message: 'Success',
        data: category,
      };
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }

  async getCategories() {
    try {
      const category = await this.prisma.category.findMany({});

      return {
        message: 'Success',
        data: category,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async getCategory(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
        data: category,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async updateCategory(id: number, payload) {
    try {
      const exist = await this.prisma.category.findFirst({
        where: {
          id,
        },
      });

      if (exist) {
        throw new NotFoundException('Data Tidak Ditemukan!');
      }

      const category = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          category_name: payload.category_name,
        },
      });

      return {
        message: 'Success',
        data: category,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async deleteCategory(id: number) {
    try {
      await this.prisma.category.delete({
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
