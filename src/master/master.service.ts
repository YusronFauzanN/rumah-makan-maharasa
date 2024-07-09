import { Injectable } from '@nestjs/common';
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
}
