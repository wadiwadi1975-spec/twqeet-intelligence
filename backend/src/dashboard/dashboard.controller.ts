import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('summary')
  async getSummary(@Query('companyId') companyId: string) {
    return this.dashboardService.getSummary(companyId || '1');
  }

  @Get('health')
  async getHealth(@Query('companyId') companyId: string) {
    return this.dashboardService.getHealth(companyId || '1');
  }

  @Get('kpis')
  async getKPIs(@Query('companyId') companyId: string) {
    return this.dashboardService.getKPIs(companyId || '1');
  }

  @Get('timeline')
  async getTimeline(@Query('companyId') companyId: string) {
    return this.dashboardService.getTimeline(companyId || '1');
  }
}
