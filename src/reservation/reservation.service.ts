import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from 'src/libs/dto';
import { TCreateReservationRequest } from 'src/libs/entities';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(payload: TCreateReservationRequest) {
    const {
      name,
      reservation_date,
      reservation_time,
      phone_number,
      email,
      number_of_people,
      desc,
      desk_id,
    } = payload;

    try {
      const exist = await this.prisma.reservation.findFirst({
        where: {
          reservation_date,
          reservation_time,
          desk_id,
        },
      });

      if (exist) {
        return {
          message: 'Meja Sudah Direservasi!',
        };
      }

      await this.prisma.reservation.create({
        data: {
          name,
          reservation_date,
          reservation_time,
          email,
          phone_number,
          number_of_people,
          desc,
          desk_id,
        },
      });

      return {
        message: 'Reservasi Berhasil',
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Terjadi kesalahan saat membuat reservasi.',
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const reservations = await this.prisma.reservation.findMany({});

      return {
        message: 'Success',
        data: reservations,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: {
          id,
        },
      });

      return {
        message: 'Success',
        data: reservation,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan',
        error: error.message,
      };
    }
  }

  async update(id: number, payload: TCreateReservationRequest) {
    try {
      const exist = await this.prisma.reservation.findFirst({
        where: {
          id,
        },
      });

      if (!exist) {
        throw new NotFoundException('Data Tidak Ditemukan!');
      }

      const reservation = await this.prisma.reservation.update({
        where: {
          id,
        },
        data: payload,
      });

      return {
        message: 'Success',
        data: reservation,
      };
    } catch (error) {
      return {
        message: 'Terjadi Kesalahan!',
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.reservation.delete({
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
