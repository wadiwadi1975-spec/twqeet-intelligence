import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.accountingService.findAll(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.accountingService.create(data);
  }

  @Get('summary')
  async getSummary(@Query('companyId') companyId: string) {
    return this.accountingService.getSummary(companyId);
  }
}
