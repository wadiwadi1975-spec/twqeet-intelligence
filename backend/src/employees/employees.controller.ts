import { Controller, Get, Query, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.employeesService.findAll(companyId || '1');
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('companyId') companyId: string) {
    return this.employeesService.getLeaderboard(companyId || '1');
  }

  @Get(':id/performance')
  async getPerformance(@Query('companyId') companyId: string, @Param('id') id: string) {
    return this.employeesService.getPerformance(companyId || '1', id);
  }
}
