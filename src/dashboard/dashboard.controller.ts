import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('card-data')
  getCardData() {
    return this.dashboardService.getCardData();
  }

  @Get('/line-chart/sales-trend')
  getSalesTrend(@Query() payload) {
    return this.dashboardService.getSalesTrend(payload);
  }
}
