import { Injectable } from '@nestjs/common';
import { dateRanges } from 'src/libs/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(readonly prisma: PrismaService) {}

  async getCardData() {
    try {
      const [income_sales, total_orders, total_reservations, customer] =
        await Promise.all([
          this.prisma.order.aggregate({
            _sum: {
              total_price: true,
            },
          }),
          this.prisma.order.count(),
          this.prisma.reservation.count(),
          this.prisma.user.count(),
        ]);

      return {
        message: 'Success',
        income_sales: income_sales._sum.total_price || 0,
        total_orders,
        total_reservations,
        customer,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  async getSalesTrend(payload: any) {
    try {
      const { start_date, end_date } = payload;
      const dateFilter =
        start_date && end_date
          ? {
              created_at: {
                gte: new Date(start_date),
                lte: new Date(end_date),
              },
            }
          : {};

      const data = await this.prisma.order.findMany({
        select: {
          id: true,
          total_price: true,
          created_at: true,
          order_detail: {
            select: {
              product: true,
            },
          },
        },
        where: dateFilter,
        orderBy: {
          created_at: 'asc',
        },
      });

      if (start_date && end_date) {
        const dates = dateRanges(new Date(start_date), new Date(end_date));
        const result = dates.map((date) => {
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);

          const filteredData = data.filter((item) => {
            const itemDate = new Date(item.created_at);
            return itemDate >= date && itemDate < nextDate;
          });

          const total_income = filteredData.reduce(
            (acc, cur) => acc + cur.total_price,
            0,
          );

          const total_net_income = filteredData.reduce(
            (acc, cur) =>
              acc +
              cur.order_detail.reduce(
                (sum, orderDetail) => sum + orderDetail.product.price,
                0,
              ),
            0,
          );

          return {
            date: date.toISOString().split('T')[0], // Format tanggal menjadi YYYY-MM-DD
            total_order: filteredData.length,
            total_income,
            total_net_income,
          };
        });

        return {
          message: 'Success',
          data: result,
        };
      }

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const result = months.map((month) => {
        const filteredData = data.filter((item) => {
          const date = new Date(item.created_at);
          const monthName = date.toLocaleString('default', { month: 'long' });
          return monthName === month;
        });

        const total_income = filteredData.reduce(
          (acc, cur) => acc + cur.total_price,
          0,
        );

        const total_net_income = filteredData.reduce(
          (acc, cur) =>
            acc +
            cur.order_detail.reduce(
              (sum, orderDetail) => sum + orderDetail.product.price,
              0,
            ),
          0,
        );

        const average_transaction =
          filteredData.reduce(
            (acc, cur) =>
              acc +
              cur.order_detail.reduce(
                (sum, orderDetail) => sum + orderDetail.product.price,
                0,
              ),
            0,
          ) / filteredData.length || 0;

        return {
          month,
          total_order: filteredData.length,
          total_income,
          total_net_income,
          average_transaction,
        };
      });

      return {
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }
}
