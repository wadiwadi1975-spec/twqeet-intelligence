import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.alertsService.findAll(companyId);
  }

  @Post()
  async create(
    @Body('message') message: string,
    @Body('priority') priority: string,
    @Body('companyId') companyId: string,
  ) {
    return this.alertsService.create(message, priority, companyId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.alertsService.markAsRead(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.alertsService.delete(id);
  }
}
