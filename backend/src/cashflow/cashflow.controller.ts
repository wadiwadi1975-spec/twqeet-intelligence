import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CashFlowService } from './cashflow.service';

@Controller('cashflow')
export class CashFlowController {
  constructor(private cashFlowService: CashFlowService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.cashFlowService.findAll(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.cashFlowService.create(data);
  }

  @Get('summary')
  async getSummary(@Query('companyId') companyId: string) {
    return this.cashFlowService.getSummary(companyId);
  }
}
