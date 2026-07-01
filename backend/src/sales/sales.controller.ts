import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.salesService.findAll(companyId);
  }

  @Get('daily')
  async findDaily(@Query('companyId') companyId: string) {
    return this.salesService.findDaily(companyId);
  }

  @Get('monthly')
  async findMonthly(@Query('companyId') companyId: string) {
    return this.salesService.findMonthly(companyId);
  }

  @Get('stats')
  async getStats(@Query('companyId') companyId: string) {
    return this.salesService.getStats(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.salesService.create(data);
  }
}
