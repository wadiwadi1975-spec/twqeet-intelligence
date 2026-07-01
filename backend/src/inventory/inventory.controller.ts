import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.inventoryService.findAll(companyId);
  }

  @Get('aging')
  async findAging(@Query('companyId') companyId: string) {
    return this.inventoryService.findAging(companyId);
  }

  @Get('low-stock')
  async findLowStock(@Query('companyId') companyId: string) {
    return this.inventoryService.findLowStock(companyId);
  }

  @Get('stats')
  async getStats(@Query('companyId') companyId: string) {
    return this.inventoryService.getStats(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.inventoryService.create(data);
  }

  @Put(':id/quantity')
  async updateQuantity(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.inventoryService.updateQuantity(id, quantity);
  }
}
