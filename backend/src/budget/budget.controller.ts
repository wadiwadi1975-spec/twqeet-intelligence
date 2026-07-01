import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { BudgetService } from './budget.service';

@Controller('budgets')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Get()
  findAll(@Query('companyId') companyId: string) {
    return this.budgetService.findAll(companyId || '1');
  }

  @Get('summary')
  getSummary(@Query('companyId') companyId: string) {
    return this.budgetService.getSummary(companyId || '1');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.budgetService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.budgetService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.budgetService.delete(id);
  }
}
