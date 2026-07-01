import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.purchasesService.findAll(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.purchasesService.create(data);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.purchasesService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.purchasesService.delete(id);
  }
}
