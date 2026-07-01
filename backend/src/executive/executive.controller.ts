import { Controller, Get, Query } from '@nestjs/common';
import { ExecutiveService } from './executive.service';

@Controller('executive')
export class ExecutiveController {
  constructor(private executiveService: ExecutiveService) {}

  @Get('brief')
  async getBrief(@Query('companyId') companyId: string) {
    return this.executiveService.getBrief(companyId || '1');
  }

  @Get('decisions')
  async getDecisions(@Query('companyId') companyId: string) {
    return this.executiveService.getDecisions(companyId || '1');
  }

  @Get('radar')
  async getRadar(@Query('companyId') companyId: string) {
    return this.executiveService.getRadar(companyId || '1');
  }

  @Get('opportunities')
  async getOpportunities(@Query('companyId') companyId: string) {
    return this.executiveService.getOpportunities(companyId || '1');
  }

  @Get('heat-map')
  async getHeatMap(@Query('companyId') companyId: string) {
    return this.executiveService.getHeatMap(companyId || '1');
  }

  @Get('benchmark')
  async getSmartBenchmark(@Query('companyId') companyId: string) {
    return this.executiveService.getSmartBenchmark(companyId || '1');
  }

  @Get('monthly-review')
  async getMonthlyReview(@Query('companyId') companyId: string) {
    return this.executiveService.getMonthlyReview(companyId || '1');
  }

  @Get('morning-report')
  async getMorningReport(@Query('companyId') companyId: string) {
    return this.executiveService.getMorningReport(companyId || '1');
  }

  @Get('budget')
  async getBudgetAllocation(@Query('companyId') companyId: string) {
    return this.executiveService.getBudgetAllocation(companyId || '1');
  }
}
